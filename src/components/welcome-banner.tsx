
'use client';

import { useState, useEffect } from 'react';
import { Truck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from './logo';

const SESSION_STORAGE_KEY = 'nidhuvastra_welcome_banner_shown';

export function WelcomeBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    try {
      const hasBeenShown = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (!hasBeenShown) {
        setIsVisible(true);
        sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');

        const fadeOutTimer = setTimeout(() => {
          setIsFadingOut(true);
        }, 2500); // Start fading out after 2.5s

        const hideTimer = setTimeout(() => {
          setIsVisible(false);
        }, 3500); // Completely hide after 3.5s (allowing for fade-out animation)

        return () => {
          clearTimeout(fadeOutTimer);
          clearTimeout(hideTimer);
        };
      }
    } catch (error) {
      // This can happen in environments where sessionStorage is not available.
      // We can safely ignore this error.
      console.error('Session storage is not available.');
    }
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in',
        isFadingOut && 'animate-fade-out'
      )}
    >
      <div className="flex flex-col items-center gap-6 rounded-lg bg-card p-8 shadow-2xl text-center border">
        <Logo />
        <h2 className="text-2xl md:text-3xl font-headline text-foreground">
          Delivering Elegance, All Over India
        </h2>
        <Truck className="h-12 w-12 text-primary animate-pulse" />
      </div>
    </div>
  );
}
