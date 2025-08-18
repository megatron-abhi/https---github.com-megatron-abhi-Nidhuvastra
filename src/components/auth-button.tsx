
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
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { Loader2 } from 'lucide-react';
import { ref, set, get, serverTimestamp } from 'firebase/database';

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
    // Check if recaptcha verifier is already created
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
    }
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      },
    });
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
      // For local development with emulator, you might need test numbers.
      if (error.code === 'auth/missing-phone-number') {
        toast({
            title: "Error",
            description: "Please enter a phone number.",
            variant: "destructive"
        });
      } else {
        toast({
            title: "Error",
            description: "Could not send OTP. If you're developing locally, ensure the Firebase emulators are running and you're using a test phone number.",
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

    try {
        const result = await window.confirmationResult?.confirm(otp);
        if (result?.user) {
            const user = result.user;
            // Check if user exists in Realtime Database
            const userRef = ref(db, 'users/' + user.uid);
            const snapshot = await get(userRef);
            if (!snapshot.exists()) {
                // New user, create a record
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
            resetState(true); // Close dialog on success
        } else {
            throw new Error("Invalid OTP or confirmation result.");
        }
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: error.message || "Invalid OTP. Please try again.",
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
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && resetState(true)}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>Login</Button>
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
