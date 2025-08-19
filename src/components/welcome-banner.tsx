
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
        }, 3500); // Start fading out after 3.5s

        const hideTimer = setTimeout(() => {
          setIsVisible(false);
        }, 4500); // Completely hide after 4.5s (allowing for fade-out animation)

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
      <div className="flex flex-col items-center gap-6 rounded-lg bg-card p-8 shadow-2xl text-center border overflow-hidden">
        <Logo />
        <h2 className="text-2xl md:text-3xl font-headline text-foreground">
          Delivering Elegance, All Over India
        </h2>
        
        <div className="w-64 h-24 relative">
          {/* Road */}
          <div className="absolute bottom-4 left-0 w-full h-0.5 bg-muted-foreground/50 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full animate-road-lines"></div>
          </div>
        
          {/* Package */}
          <div className="absolute bottom-5 right-1/2 w-8 h-8 bg-amber-200 border-2 border-amber-800 animate-package-to-truck"></div>

          {/* Truck */}
          <svg
            className="w-24 h-24 text-primary absolute bottom-0 left-0 animate-truck-drive"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.5,13.2H20V9.8C20,8.2,18.8,7,17.2,7H11.8c-1.2,0-2.3,0.8-2.7,1.9L6.5,15H4.2C3,15,2,16,2,17.2v0.7C2,18.5,2.5,19,3.2,19h1.1c0.5,1.7,2.1,3,3.9,3s3.4-1.3,3.9-3h4.3c0.5,1.7,2.1,3,3.9,3s3.4-1.3,3.9-3H22v-1.1C22,14,21.8,13.2,21.5,13.2z M8.2,20.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2S9.4,20.2,8.2,20.2z M19.2,20.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2S20.4,20.2,19.2,20.2z M20,11.8v0.8h-1.4l-2.6-4.2h3.1c0.7,0,1.2,0.6,1.2,1.2V11.8z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
