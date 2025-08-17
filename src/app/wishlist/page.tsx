
'use client';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mock wishlist data - in a real app, this would come from user data
const wishlistedProducts = [products[1], products[3]];

export default function WishlistPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline text-foreground">Your Wishlist</h1>
          <p className="text-lg text-muted-foreground mt-2">The sarees you've saved for later.</p>
        </div>

        {wishlistedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-lg">
            <h3 className="text-2xl font-semibold">Your Wishlist is Empty</h3>
            <p className="text-muted-foreground mt-2 mb-6">Looks like you haven't added any sarees yet. Start exploring!</p>
            <Button asChild>
                <Link href="/collections/all">Explore Collections</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
