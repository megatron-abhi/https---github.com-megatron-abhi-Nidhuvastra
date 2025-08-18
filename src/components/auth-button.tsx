
'use client';

import { useState } from 'react';
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
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult, connectAuthEmulator } from 'firebase/auth';
import { Loader2 } from 'lucide-react';
import { ref, set, get, serverTimestamp } from 'firebase/database';

const TEST_PHONE_NUMBER = '+919876543210';
const TEST_OTP = '111111';


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

  const setupRecaptcha = () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
    }
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
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Test mode bypass
    if (phoneNumber === TEST_PHONE_NUMBER) {
        setStep('otp');
        toast({
            title: "OTP Sent (Test Mode)",
            description: `Enter the test OTP ${TEST_OTP}.`,
        });
        return;
    }
        
    if (!/^\+[1-9]\d{1,14}$/.test(phoneNumber)) {
        toast({
            title: "Invalid Phone Number",
            description: "Please enter a valid phone number with country code (e.g., +919876543210).",
            variant: "destructive",
        });
        return;
    }
    setIsLoading(true);
    setupRecaptcha();
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
      console.error(error);
      if (error.code === 'auth/network-request-failed') {
          toast({
              title: "Network Error",
              description: "Could not connect to Firebase. If you're developing locally, ensure the Firebase Emulator is running or use the test phone number.",
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

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Test mode bypass
    if (phoneNumber === TEST_PHONE_NUMBER && otp === TEST_OTP) {
        toast({
            title: "Welcome!",
            description: "You have been logged in successfully in test mode.",
        });
        resetState(true);
        setIsLoading(false);
        // This won't create a real user session in Firebase, but allows UI testing.
        // For a real session, the emulator or a live project is needed.
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
        } else {
            throw new Error("Invalid OTP or confirmation result.");
        }
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: error.code === 'auth/invalid-verification-code' ? "Invalid OTP. Please try again." : error.message,
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
                placeholder="123456"
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
