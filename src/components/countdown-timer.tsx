
'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  expiryDate: string;
}

const CountdownTimer = ({ expiryDate }: CountdownTimerProps) => {
    const [timeLeft, setTimeLeft] = useState<any>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const calculateTimeLeft = () => {
            const difference = +new Date(expiryDate) - +new Date();
            let newTimeLeft = {};

            if (difference > 0) {
                newTimeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            return newTimeLeft;
        };

        // Set initial time right away
        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [expiryDate]);
    
    if (!isMounted) {
        return (
             <div className="bg-destructive/20 text-destructive-foreground p-2 rounded-md mt-2">
                <h4 className="text-sm font-semibold text-center mb-2 text-destructive">Offer Ends In</h4>
                <div className="h-9 flex justify-center items-center">
                    <span className="text-destructive font-bold text-xs">Loading...</span>
                </div>
            </div>
        );
    }

    if (!timeLeft || Object.keys(timeLeft).length === 0) {
        return (
            <div className="bg-destructive/20 text-destructive-foreground p-2 rounded-md mt-2">
                <h4 className="text-sm font-semibold text-center mb-2 text-destructive">Offer Ended</h4>
                <div className="h-9 flex justify-center items-center">
                    <span className="text-destructive font-bold">Time's up!</span>
                </div>
            </div>
        );
    }
  
    const timerComponents: JSX.Element[] = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (timeLeft[interval] === undefined) {
            return;
        }

        timerComponents.push(
            <div key={interval} className="flex flex-col items-center w-10">
                <span className="font-bold text-lg">{timeLeft[interval].toString().padStart(2, '0')}</span>
                <span className="text-xs uppercase">{interval}</span>
            </div>
        );
    });

  return (
    <div className="bg-destructive/20 text-destructive-foreground p-2 rounded-md mt-2">
        <h4 className="text-sm font-semibold text-center mb-2 text-destructive">Offer Ends In</h4>
        <div className="flex justify-center gap-2">
            {timerComponents.length ? timerComponents : <span className="text-destructive font-bold">Loading...</span>}
        </div>
    </div>
  );
};

export default CountdownTimer;
