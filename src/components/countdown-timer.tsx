
'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  expiryDate: string;
}

const CountdownTimer = ({ expiryDate }: CountdownTimerProps) => {
    const [isClient, setIsClient] = useState(false);
    
    const calculateTimeLeft = () => {
        const difference = +new Date(expiryDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
        }
        return timeLeft;
    };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expiryDate]);

  if (!isClient) {
    return null; // Don't render on the server
  }

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!(timeLeft as any)[interval] && (timeLeft as any)[interval] !== 0) {
        return;
    }

    timerComponents.push(
        <div key={interval} className="flex flex-col items-center">
            <span className="font-bold text-lg">{(timeLeft as any)[interval].toString().padStart(2, '0')}</span>
            <span className="text-xs uppercase">{interval}</span>
        </div>
    );
  });

  return (
    <div className="bg-destructive/20 text-destructive-foreground p-2 rounded-md mt-2">
        <h4 className="text-sm font-semibold text-center mb-2 text-destructive">Offer Ends In</h4>
        <div className="flex justify-center gap-3">
            {timerComponents.length ? timerComponents : <span className="text-destructive font-bold">Time's up!</span>}
        </div>
    </div>
  );
};

export default CountdownTimer;
