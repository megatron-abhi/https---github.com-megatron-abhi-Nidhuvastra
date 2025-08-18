
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, Archive, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState } from 'react';
import CountdownTimer from './countdown-timer';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/use-cart';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasSecondImage = product.images.length > 1;
  const { user } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();
  const { addToCart } = useCart();

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent navigation
    if (!user) {
        toast({
            title: "Authentication Required",
            description: "Please log in to add items to your cart.",
            variant: "destructive"
        });
        return;
    }
    addToCart(product, 1, product.colors[0], product.sizes[0]);
  }

  return (
    <Card className="group overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <Link href={`/product/${product.slug}`}>
        <CardHeader className="p-0">
          <div className="relative w-full h-96">
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt}
              fill
              className={cn(
                'object-cover transition-opacity duration-300',
                hasSecondImage && 'group-hover:opacity-0'
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={product.images[0].aiHint}
            />
            {hasSecondImage && (
              <Image
                src={product.images[1].src}
                alt={product.images[1].alt}
                fill
                className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={product.images[1].aiHint}
              />
            )}
            {isClient && user && (
              <Button variant="ghost" size="icon" className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white text-rose-500">
                  <Heart />
                  <span className="sr-only">Add to wishlist</span>
              </Button>
            )}
            {product.isExclusive && (
              <Badge variant="secondary" className="absolute top-3 left-3 flex items-center gap-1">
                 {product.promotion === 'Limited Time' ? <Clock className="h-3 w-3" /> : <Archive className="h-3 w-3" />}
                {product.promotion}
              </Badge>
            )}
            {product.originalPrice && !product.isExclusive && (
              <Badge variant="destructive" className="absolute top-3 left-3">SALE</Badge>
            )}
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex-grow">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-lg font-semibold leading-tight mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">{product.category}</p>
        {isClient && product.promotion === 'Limited Time' && product.offerEndDate && (
          <CountdownTimer expiryDate={product.offerEndDate} />
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="text-lg font-bold">
          <span>₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="ml-2 text-sm text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
        <Button size="sm" variant="outline" onClick={handleAddToCart}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
