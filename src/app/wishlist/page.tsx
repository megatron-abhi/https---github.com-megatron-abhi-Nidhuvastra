
'use client';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useWishlist } from '@/hooks/use-wishlist';
import { useAuth } from '@/hooks/use-auth';
import { Heart } from 'lucide-react';


export default function WishlistPage() {
  const { wishlistItems, loading: wishlistLoading } = useWishlist();
  const { user, loading: authLoading } = useAuth();

  const isLoading = wishlistLoading || authLoading;

  if (isLoading) {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12 text-center">
            <p className="text-muted-foreground">Loading your wishlist...</p>
        </div>
    )
  }

  if (!user) {
    return (
        <div className="bg-background">
            <div className="container mx-auto px-4 py-8 md:py-12">
                 <div className="text-center py-16 bg-card rounded-lg flex flex-col items-center">
                    <Heart className="h-16 w-16 text-primary mb-4" />
                    <h3 className="text-2xl font-semibold">Log in to view your Wishlist</h3>
                    <p className="text-muted-foreground mt-2 mb-6 max-w-sm">You can create, view, or edit your wishlist once you've logged in.</p>
                     <Button asChild>
                        <Link href="/">Return to Homepage</Link>
                    </Button>
              </div>
            </div>
        </div>
    )
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline text-foreground">Your Wishlist</h1>
          <p className="text-lg text-muted-foreground mt-2">The sarees you've saved for later.</p>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlistItems.map((product) => (
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
