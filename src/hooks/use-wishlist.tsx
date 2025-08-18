
'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Product } from '@/types';
import { useAuth } from './use-auth';
import { useToast } from './use-toast';
import { ref, onValue, set, remove } from 'firebase/database';
import { db } from '@/lib/firebase';

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  
  const isMockUser = user && 'uid' in user && user.uid.startsWith('test-');

  // Load wishlist from appropriate source
  useEffect(() => {
    setLoading(true);
    if (user) {
      if (isMockUser) {
        // Handle mock user with localStorage
        const storedWishlist = localStorage.getItem(`wishlist_${user.uid}`);
        setWishlistItems(storedWishlist ? JSON.parse(storedWishlist) : []);
        setLoading(false);
      } else {
        // Handle real user with Firebase
        const wishlistRef = ref(db, `wishlists/${user.uid}`);
        const unsubscribe = onValue(wishlistRef, (snapshot) => {
          const data = snapshot.val();
          setWishlistItems(data ? Object.values(data) as Product[] : []);
          setLoading(false);
        });
        return () => unsubscribe();
      }
    } else {
      // No user, clear wishlist
      setWishlistItems([]);
      setLoading(false);
    }
  }, [user, isMockUser]);

  // Persist wishlist for mock users
  useEffect(() => {
    if (user && isMockUser) {
      localStorage.setItem(`wishlist_${user.uid}`, JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, user, isMockUser]);


  const addToWishlist = (product: Product) => {
    if (!user) {
      toast({ title: "Please log in to save to your wishlist.", variant: "destructive" });
      return;
    }
    
    if (isMockUser) {
        setWishlistItems(prev => [...prev, product]);
        toast({ title: "Added to Wishlist!", description: `${product.name} has been saved.` });
    } else {
        const productRef = ref(db, `wishlists/${user.uid}/${product.id}`);
        set(productRef, product)
            .then(() => {
                toast({ title: "Added to Wishlist!", description: `${product.name} has been saved.` });
            })
            .catch((error) => {
                toast({ title: "Error", description: "Could not add to wishlist. " + error.message, variant: "destructive" });
            });
    }
  };

  const removeFromWishlist = (productId: string) => {
    if (!user) return;
    
    if (isMockUser) {
        setWishlistItems(prev => prev.filter(item => item.id !== productId));
        toast({ title: "Removed from Wishlist" });
    } else {
        const productRef = ref(db, `wishlists/${user.uid}/${productId}`);
        remove(productRef)
        .then(() => {
            toast({ title: "Removed from Wishlist" });
        })
        .catch((error) => {
            toast({ title: "Error", description: "Could not remove from wishlist. " + error.message, variant: "destructive" });
        });
    }
  };
  
  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
