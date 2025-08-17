'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { products } from '@/lib/mock-data';
import type { Product } from '@/types';
import { Minus, Plus, Trash2 } from 'lucide-react';

// Mock cart data
const cartItems = [
  { product: products[0], quantity: 1, color: 'Maroon', size: 'One Size' },
  { product: products[2], quantity: 1, color: 'Ivory', size: 'One Size' },
];

const CartItem = ({ item }: { item: { product: Product, quantity: number, color: string, size: string }}) => (
    <div className="flex items-start space-x-4 py-4">
        <div className="w-24 h-32 relative flex-shrink-0">
            <Image
                src={item.product.images[0].src}
                alt={item.product.images[0].alt}
                fill
                className="object-cover rounded-md"
                data-ai-hint={item.product.images[0].aiHint}
            />
        </div>
        <div className="flex-grow">
            <Link href={`/product/${item.product.slug}`} className="font-semibold hover:text-primary">{item.product.name}</Link>
            <p className="text-sm text-muted-foreground">Color: {item.color}</p>
            <p className="text-sm text-muted-foreground">Size: {item.size}</p>
            <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center border rounded-md h-9">
                    <Button variant="ghost" size="icon" className="h-full w-9"><Minus className="h-4 w-4" /></Button>
                    <Input type="number" value={item.quantity} className="w-12 h-full text-center border-0 focus-visible:ring-0 p-0" readOnly />
                    <Button variant="ghost" size="icon" className="h-full w-9"><Plus className="h-4 w-4" /></Button>
                </div>
            </div>
        </div>
        <div className="text-right">
            <p className="font-semibold">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive mt-2">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove item</span>
            </Button>
        </div>
    </div>
);

export default function CartPage() {
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-headline text-center mb-8">Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">Your cart is empty.</p>
            <Button asChild>
                <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Cart Items ({cartItems.length})</h2>
                <Separator />
                <div className="divide-y">
                    {cartItems.map((item) => <CartItem key={item.product.id} item={item} />)}
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="bg-card p-6 rounded-lg shadow-sm sticky top-24">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-2 text-muted-foreground">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between font-bold text-foreground text-lg">
                            <span>Total</span>
                            <span>₹{total.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                    <Button asChild size="lg" className="w-full mt-6">
                        <Link href="/checkout">Proceed to Checkout</Link>
                    </Button>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
