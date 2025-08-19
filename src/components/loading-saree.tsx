
'use client';

import { cn } from "@/lib/utils";

export const LoadingSaree = ({ className, message }: { className?: string; message?: string }) => {
    return (
        <div className={cn("flex flex-col items-center justify-center gap-4 text-center", className)}>
             <svg
                width="80"
                height="80"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
             >
                <g>
                    <path
                        d="M20,50 C20,-50 80,150 80,50 S140,-50 140,50"
                        stroke="hsl(var(--primary))"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                    >
                        <animateTransform
                            attributeName="transform"
                            type="translate"
                            values="-40 0; 0 0; 40 0; -40 0"
                            dur="2s"
                            repeatCount="indefinite"
                        />
                    </path>
                </g>
            </svg>
            {message && <p className="text-muted-foreground animate-pulse">{message}</p>}
        </div>
    )
}
