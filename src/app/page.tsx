
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/mock-data';
import { ArrowRight, Star } from 'lucide-react';
import { AnnouncementBar } from '@/components/announcement-bar';
import { ReviewStars } from '@/components/review-stars';


export default function Home() {
  const featuredProducts = products.filter(p => !p.isExclusive).slice(0, 4);
  const exclusiveProducts = products.filter(p => p.isExclusive);
 
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
       <section className="relative w-full overflow-hidden bg-background">
        <div className="container mx-auto px-4">
          <div className="relative grid grid-cols-1 md:grid-cols-12 items-center min-h-[80vh] md:min-h-screen py-16 md:py-0">
            {/* Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <h1 className="text-[20vw] md:text-[25vw] lg:text-[20vw] font-extrabold text-foreground/5 tracking-tighter animate-fade-in-slow">
                ELEGANCE
              </h1>
            </div>

            {/* Center Image */}
            <div className="absolute inset-0 md:inset-x-1/4 z-10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                 <Image
                    src="/images/herimage.png"
                    alt="Hero image of a model wearing a saree"
                    fill
                    className="object-cover object-bottom"
                    data-ai-hint="saree fashion model"
                    priority
                />
            </div>


            {/* Left Column */}
            <div className="md:col-span-4 z-20 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-5xl md:text-7xl font-headline mb-6 text-foreground">
                Modern Sarees. Effortless Elegance.
              </h1>
               <div className="pl-4 border-l-2 border-primary">
                 <p className="text-muted-foreground italic">
                   "Timeless, wearable, and truly well made."
                 </p>
               </div>
            </div>

            {/* Empty Spacer Column */}
            <div className="md:col-span-4 hidden md:block"></div>


            {/* Right Column */}
            <div className="md:col-span-4 z-20 flex flex-col items-start md:items-end animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <div className="md:text-right">
                    <p className="text-muted-foreground max-w-sm mb-6">
                        Timeless essentials for the modern minimalist. Designed to simplify your wardrobe — and elevate your everyday.
                    </p>
                    <Button asChild size="lg">
                        <Link href="/collections/all">Shop Collection</Link>
                    </Button>
                    <div className="flex items-center gap-2 mt-8 md:justify-end">
                        <ReviewStars rating={4.9} />
                        <p className="text-sm text-muted-foreground">4.9 / 5.0 (450 Reviews)</p>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </section>

      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Featured Products Section */}
      <section id="featured-products" className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline text-center mb-12">
            Featured Collection
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/collections/all">
                View All Collections <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
       {/* Exclusive Collection Section */}
      {exclusiveProducts.length > 0 && (
        <section id="exclusive-collection" className="py-16 lg:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline">Exclusive Collection</h2>
              <p className="text-muted-foreground mt-2">Limited edition sarees for the discerning connoisseur.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {exclusiveProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Brand Story Teaser */}
      <section className="bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 py-16 lg:py-24">
            <div className="md:w-1/2 w-full">
              <Image
                src="/images/5.jpg"
                alt="Artisan weaving a saree"
                width={600}
                height={450}
                className="rounded-lg shadow-lg w-full"
                data-ai-hint="indian textile lifestyle"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-3xl md:text-4xl font-headline mb-4">
                The Art of Saree Making
              </h3>
              <p className="text-muted-foreground mb-6 text-lg">
                Each NidhuVastra creation is a testament to the rich legacy of Indian craftsmanship. We partner with skilled artisans across the country to bring you sarees that are not just garments, but stories woven in thread.
              </p>
              <Button asChild variant="link" className="text-lg p-0 h-auto text-primary">
                <Link href="/about">
                  Our Story <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
