import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReviewStarsProps {
  rating: number;
  className?: string;
  starSize?: number;
}

export function ReviewStars({ rating, className, starSize = 5 }: ReviewStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className={cn(`h-${starSize} w-${starSize}`, 'text-foreground fill-foreground')} />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <Star key="half" className={cn(`h-${starSize} w-${starSize}`, 'text-foreground fill-muted')} />
          <div className="absolute top-0 left-0 h-full w-1/2 overflow-hidden">
            <Star className={cn(`h-${starSize} w-${starSize}`, 'text-foreground fill-foreground')} />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className={cn(`h-${starSize} w-${starSize}`, 'text-foreground fill-muted')} />
      ))}
    </div>
  );
}
