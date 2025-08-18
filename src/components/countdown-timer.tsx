
'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  expiryDate: string;
}

const CountdownTimer = ({ expiryDate }: CountdownTimerProps) => {
    const [timeLeft, setTimeLeft] = useState<any>(null);

    useEffect(() => {
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

        // Set initial time on mount (client-side only)
        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTime-left());
        }, 1000);

        return () => clearInterval(timer);
    }, [expiryDate]);

    if (!timeLeft || Object.keys(timeLeft).length === 0) {
        return (
            <div className="bg-destructive/20 text-destructive-foreground p-2 rounded-md mt-2">
                <h4 className="text-sm font-semibold text-center mb-2 text-destructive">Offer Ended</h4>
                <div className="flex justify-center gap-3">
                    <span className="text-destructive font-bold">Time's up!</span>
                </div>
            </div>
        );
    }
  
    const timerComponents: JSX.Element[] = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval] && timeLeft[interval] !== 0) {
            return;
        }

        timerComponents.push(
            <div key={interval} className="flex flex-col items-center">
                <span className="font-bold text-lg">{timeLeft[interval].toString().padStart(2, '0')}</span>
                <span className="text-xs uppercase">{interval}</span>
            </div>
        );
    });

  return (
    <div className="bg-destructive/20 text-destructive-foreground p-2 rounded-md mt-2">
        <h4 className="text-sm font-semibold text-center mb-2 text-destructive">Offer Ends In</h4>
        <div className="flex justify-center gap-3">
            {timerComponents.length ? timerComponents : <span className="text-destructive font-bold">Loading...</span>}
        </div>
    </div>
  );
};

export default CountdownTimer;
