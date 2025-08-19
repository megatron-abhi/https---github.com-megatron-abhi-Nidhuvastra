
'use client';

import Image from 'next/image';
import { notFound, useRouter, useParams } from 'next/navigation';
import { products, reviews as mockReviews } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ReviewStars } from '@/components/review-stars';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProductCard } from '@/components/product-card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Plus, Minus } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useCart } from '@/hooks/use-cart';

export default function ProductPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const product = products.find((p) => p.slug === slug);
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');

  if (!product) {
    notFound();
  }
  
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleCartAction = (action: 'add' | 'buy') => {
    if (!user) {
        toast({
            title: "Authentication Required",
            description: `Please log in to ${action === 'add' ? 'add items to your cart' : 'buy now'}.`,
            variant: "destructive"
        });
        return;
    }
    
    addToCart(product, quantity, selectedColor, selectedSize);

    if (action === 'buy') {
        router.push('/checkout');
    }
  };
  
  const mediaItems = [];
  if (product.videoSrc) {
    mediaItems.push({ type: 'video', src: product.videoSrc });
  }
  product.images.forEach(img => mediaItems.push({ type: 'image', ...img }));

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        {/* Product Image Carousel */}
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {mediaItems.map((media, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-[4/5] bg-muted rounded-lg shadow-lg overflow-hidden">
                    {media.type === 'video' ? (
                        <video
                            src={media.src}
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    ) : (
                        <Image
                          src={media.src}
                          alt={media.alt || 'Product image'}
                          width={800}
                          height={1000}
                          className="w-full h-full object-cover"
                          data-ai-hint={media.aiHint}
                        />
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4" />
            <CarouselNext className="absolute right-4" />
          </Carousel>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-headline mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <ReviewStars rating={product.rating} />
            <a href="#reviews" className="text-sm text-muted-foreground hover:text-primary">
              ({product.reviewCount} reviews)
            </a>
          </div>

          <p className="text-3xl font-bold text-primary mb-4">
            ₹{product.price.toLocaleString('en-IN')}
            {product.originalPrice && (
              <span className="ml-3 text-xl font-normal text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </p>
          
          <p className="text-muted-foreground mb-6">{product.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="color" className="text-sm font-semibold">Color</Label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger id="color" className="w-full mt-1">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {product.colors.map(color => <SelectItem key={color} value={color}>{color}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="size" className="text-sm font-semibold">Size</Label>
               <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger id="size" className="w-full mt-1">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map(size => <SelectItem key={size} value={size}>{size}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <Label htmlFor="quantity" className="text-sm font-semibold">Quantity</Label>
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus className="h-4 w-4" /></Button>
              <Input id="quantity" type="number" value={quantity} className="w-14 h-9 text-center border-0 focus-visible:ring-0" readOnly />
              <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setQuantity(q => q + 1)}><Plus className="h-4 w-4" /></Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button size="lg" variant="outline" className="flex-1" onClick={() => handleCartAction('add')}>Add to Cart</Button>
            <Button size="lg" variant="default" className="flex-1" onClick={() => handleCartAction('buy')}>Buy Now</Button>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Product Details</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {product.details.map((detail, i) => <li key={i}>{detail}</li>)}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Shipping & Returns</AccordionTrigger>
              <AccordionContent>
                Free shipping on all orders above ₹5000. Easy 7-day returns. Please read our return policy for more details.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </div>
      </div>
      
      <Separator className="my-12 md:my-16" />

      {/* Customer Reviews */}
      <div id="reviews" className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-headline mb-8 text-center">What Our Customers Say</h2>
        <div className="space-y-8 max-w-3xl mx-auto">
          {mockReviews.map(review => (
            <div key={review.id} className="flex gap-4 p-6 bg-card rounded-lg shadow-sm">
              <Avatar>
                <AvatarImage src={review.avatar} alt={review.author} />
                <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{review.author}</h4>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <ReviewStars rating={review.rating} className="my-2" />
                <p className="text-muted-foreground">{review.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-12 md:my-16" />

      {/* Related Products */}
      <div>
        <h2 className="text-2xl md:text-3xl font-headline mb-8 text-center">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => <ProductCard key={p.id} product={p}/>)}
        </div>
      </div>
    </div>
  );
}
