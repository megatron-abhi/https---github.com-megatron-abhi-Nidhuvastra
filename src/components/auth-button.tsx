
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { auth, db } from '@/lib/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { Loader2 } from 'lucide-react';
import { ref, set, get, serverTimestamp } from 'firebase/database';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

// Test credentials
const TEST_USER_PHONE = '+919876543210';
const TEST_USER_OTP = '111111';
const TEST_ADMIN_PHONE = '+918310320951';
const TEST_ADMIN_OTP = '222222';
const TEST_ADMIN_UID = 'test-admin-uid';


declare global {
    interface Window {
        recaptchaVerifier?: RecaptchaVerifier;
        confirmationResult?: ConfirmationResult;
    }
}

export function AuthButton() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { setMockUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (open && !window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            size: 'invisible',
            callback: () => {
                // reCAPTCHA solved
            },
        });
      } catch(error) {
        console.error("Recaptcha setup error:", error);
      }
    }
  }, [open]);
  
  const adminUids = (process.env.NEXT_PUBLIC_ADMIN_UIDS || 'test-admin-uid').split(',');
  const isAuthorizedAdmin = (uid: string) => adminUids.includes(uid);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Test mode bypass
    if ([TEST_USER_PHONE, TEST_ADMIN_PHONE].includes(phoneNumber)) {
        setStep('otp');
        const role = phoneNumber === TEST_ADMIN_PHONE ? 'Admin' : 'User';
        const testOtp = phoneNumber === TEST_ADMIN_PHONE ? TEST_ADMIN_OTP : TEST_USER_OTP;
        toast({
            title: `OTP Sent (${role} Test Mode)`,
            description: `Enter the test OTP ${testOtp}.`,
        });
        setIsLoading(false);
        return;
    }
        
    if (!/^\+[1-9]\d{1,14}$/.test(phoneNumber)) {
        toast({
            title: "Invalid Phone Number",
            description: "Please enter a valid phone number with country code (e.g., +919876543210).",
            variant: "destructive",
        });
        setIsLoading(false);
        return;
    }
    
    const appVerifier = window.recaptchaVerifier!;
    
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      window.confirmationResult = confirmationResult;
      setStep('otp');
      toast({
        title: "OTP Sent",
        description: "An OTP has been sent to your phone number.",
      });
    } catch (error: any) {
      if (error.code === 'auth/network-request-failed') {
          toast({
              title: "Network Error",
              description: "Could not connect to Firebase. Using test numbers might solve this for local development.",
              variant: "destructive",
          })
      } else if (error.code === 'auth/too-many-requests') {
          toast({
              title: "Too Many Requests",
              description: "You've tried to sign in too many times. Please try again later.",
              variant: "destructive"
          })
      } else {
        toast({
            title: "Authentication Error",
            description: error.message || "Could not send OTP.",
            variant: "destructive",
        });
      }
    } finally {
        setIsLoading(false);
    }
  };

  const handleLoginSuccess = (uid: string) => {
    if (isAuthorizedAdmin(uid)) {
        router.push('/admin/dashboard');
    } else {
        router.push('/');
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const adminUids = (process.env.NEXT_PUBLIC_ADMIN_UIDS || TEST_ADMIN_UID).split(',');

    // Test mode bypass
    if (phoneNumber === TEST_USER_PHONE && otp === TEST_USER_OTP) {
        const mockUser = { uid: 'test-user-uid', phoneNumber: TEST_USER_PHONE };
        setMockUser(mockUser);
        toast({ title: "Welcome!", description: "Logged in as test user." });
        resetState(true);
        setIsLoading(false);
        handleLoginSuccess(mockUser.uid);
        return;
    }
    if (phoneNumber === TEST_ADMIN_PHONE && otp === TEST_ADMIN_OTP) {
        const mockUser = { uid: TEST_ADMIN_UID, phoneNumber: TEST_ADMIN_PHONE };
        setMockUser(mockUser);
        toast({ title: "Welcome, Admin!", description: "Logged in as test admin." });
        resetState(true);
        setIsLoading(false);
        handleLoginSuccess(mockUser.uid);
        return;
    }

    try {
        const result = await window.confirmationResult?.confirm(otp);
        if (result?.user) {
            const user = result.user;
            
            const userRef = ref(db, 'users/' + user.uid);
            const snapshot = await get(userRef);
            if (!snapshot.exists()) {
                await set(userRef, {
                    uid: user.uid,
                    phoneNumber: user.phoneNumber,
                    createdAt: serverTimestamp(),
                });
                toast({
                    title: "Account Created!",
                    description: "You have been logged in successfully.",
                });
            } else {
                 toast({
                    title: "Welcome Back!",
                    description: "You have been logged in successfully.",
                });
            }
            resetState(true);
            handleLoginSuccess(user.uid); 
        } else {
            throw new Error("Invalid OTP or confirmation result.");
        }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.code === 'auth/invalid-verification-code' ? "Invalid OTP. Please try again." : "Failed to verify OTP.",
        variant: "destructive",
      });
    } finally {
        setIsLoading(false);
    }
  };

  const resetState = (shouldClose: boolean) => {
    if (shouldClose) {
        setOpen(false);
    }
    setTimeout(() => {
        setStep('phone');
        setPhoneNumber('');
        setOtp('');
        setIsLoading(false);
    }, 300); // Delay to allow dialog to close gracefully
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
        if (!isOpen) {
            resetState(true);
        } else {
            setOpen(true);
        }
     }}>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {step === 'phone' ? (
          <>
            <DialogHeader>
              <DialogTitle>Login or Sign Up</DialogTitle>
              <DialogDescription>
                Enter your phone number to receive a one-time password (OTP).
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send OTP
              </Button>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Verify OTP</DialogTitle>
              <DialogDescription>
                Enter the 6-digit OTP sent to {phoneNumber}.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <Input
                id="otp"
                type="text"
                placeholder="111111"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Verify OTP
              </Button>
            </form>
            <Button variant="link" onClick={() => resetState(false)}>
                Use a different phone number
            </Button>
          </>
        )}
        <div id="recaptcha-container"></div>
      </DialogContent>
    </Dialog>
  );
}
