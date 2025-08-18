
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { Lock } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Logo } from '@/components/logo';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const shipping = totalPrice > 5000 ? 0 : 99;
  const total = totalPrice + shipping;

  useEffect(() => {
    if (!loading && !user) {
        router.push('/cart');
    }
    if (!loading && user && cartItems.length === 0) {
        router.push('/collections/all');
    }
  },[user, loading, cartItems, router]);

  const handlePlaceOrder = () => {
    // In a real app, this would submit the order to a backend
    toast({
        title: "Order Placed!",
        description: "Thank you for your purchase. We've received your order and will process it shortly."
    });
    clearCart();
    router.push('/');
  }

  if (loading || !user || cartItems.length === 0) {
      return (
        <div className="container mx-auto px-4 py-8 md:py-12 text-center">
            <p>Loading checkout...</p>
        </div>
      )
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8">
            <div className="flex justify-center mb-2">
                <Logo />
            </div>
            <p className="text-muted-foreground mt-1">Checkout</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left side: Shipping and Payment */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
                <CardDescription>Enter your destination to receive your order.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="you@example.com" />
                </div>
                <div>
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div>
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Silk Road" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Mumbai" />
                </div>
                <div>
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" placeholder="Maharashtra" />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP / Postal Code</Label>
                  <Input id="zip" placeholder="400001" />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" defaultValue="India" readOnly />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>All transactions are secure and encrypted.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="•••• •••• •••• ••••" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry-date">Expiry Date</Label>
                    <Input id="expiry-date" placeholder="MM / YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="•••" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="name-on-card">Name on Card</Label>
                  <Input id="name-on-card" placeholder="John Doe" />
                </div>
                <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="same-as-shipping" />
                    <Label htmlFor="same-as-shipping" className="text-sm">Billing address is the same as my shipping address</Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right side: Order Summary */}
          <div className="lg:row-start-1 lg:col-start-2">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.product.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-20 rounded-md overflow-hidden border">
                          <Image src={item.product.images[0].src} alt={item.product.images[0].alt} fill className="object-cover" data-ai-hint={item.product.images[0].aiHint}/>
                          <span className="absolute -top-2 -right-2 bg-muted text-muted-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">{item.quantity}</span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">{item.product.category}</p>
                        </div>
                      </div>
                      <p className="font-medium text-sm">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="space-y-2 text-muted-foreground">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}</span>
                    </div>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between font-bold text-foreground text-lg">
                    <span>Total</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
                <Button size="lg" className="w-full mt-6" onClick={handlePlaceOrder}>
                    <Lock className="mr-2 h-4 w-4" /> Place Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
