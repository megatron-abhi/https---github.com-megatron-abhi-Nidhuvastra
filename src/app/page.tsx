
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/mock-data';
import { ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';


export default function Home() {
  const featuredProducts = products.filter(p => !p.isExclusive).slice(0, 4);
  const exclusiveProducts = products.filter(p => p.isExclusive);
  const videoSources = ['/videos/showcase.mp4', '/videos/showcase2.mp4', '/videos/showcase3.mp4'];
 
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full flex items-center justify-start text-left overflow-hidden bg-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative z-10 p-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline mb-4 text-foreground drop-shadow-lg">
                        Modern sarees.
                    </h1>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline mb-6 text-foreground drop-shadow-lg">
                        Effortless elegance.
                    </h1>
                    <p className="text-lg md:text-xl max-w-xl mb-8 text-muted-foreground drop-shadow-md">
                        Experience premium Indian sarees designed for comfort, quality, and modern elegance.
                    </p>
                    <Button asChild size="lg">
                        <Link href="/collections/all">Explore Collections</Link>
                    </Button>
                </div>
                <div className="relative h-[80vh] w-full flex gap-4 -rotate-12 transform-gpu">
                    <div className="w-1/2 space-y-4 animate-marquee-vertical-slow">
                        <div className="h-[40vh] relative rounded-2xl shadow-2xl overflow-hidden">
                           <Image src="/images/img01.jpg" alt="Saree model" fill objectFit="cover" data-ai-hint="saree fashion model" />
                        </div>
                         <div className="h-[40vh] relative rounded-2xl shadow-2xl overflow-hidden">
                           <Image src="/images/img02.jpg" alt="Saree detail" fill objectFit="cover" data-ai-hint="indian textile lifestyle" />
                        </div>
                        <div className="h-[40vh] relative rounded-2xl shadow-2xl overflow-hidden">
                           <Image src="/images/img06.jpg" alt="Saree detail" fill objectFit="cover" data-ai-hint="indian textile lifestyle" />
                        </div>
                    </div>
                    <div className="w-1/2 space-y-4 animate-marquee-vertical-fast -translate-y-1/4">
                       <div className="h-[40vh] relative rounded-2xl shadow-2xl overflow-hidden">
                           <Image src="/images/img03.jpg" alt="Weaving loom" fill objectFit="cover" data-ai-hint="saree weaving artisan" />
                        </div>
                       <div className="h-[40vh] relative rounded-2xl shadow-2xl overflow-hidden">
                           <Image src="/images/img04.jpg" alt="Another saree model" fill objectFit="cover" data-ai-hint="saree office wear" />
                        </div>
                        <div className="h-[40vh] relative rounded-2xl shadow-2xl overflow-hidden">
                           <Image src="/images/img05.jpg" alt="Another saree model" fill objectFit="cover" data-ai-hint="saree office wear" />
                        </div>
                    </div>
                 </div>
            </div>
        </div>
      </section>

      {/* Video Showcase Section */}
        <section className="bg-background py-16 lg:py-24 overflow-hidden">
            <div className="container mx-auto px-4">
                 <h2 className="text-3xl md:text-4xl font-headline text-center mb-12">
                    Behind the Weave
                </h2>
                <Carousel 
                    className="w-full" 
                    opts={{
                        loop: true, 
                        align: 'center',
                    }}
                    plugins={[
                        Autoplay({
                          delay: 5000,
                          stopOnInteraction: true,
                        }),
                    ]}
                >
                    <CarouselContent className="-ml-4 h-[70vh]">
                    {videoSources.map((src, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                            <div className="relative w-full h-full rounded-lg shadow-lg overflow-hidden">
                                <video
                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                    src={src}
                                    muted
                                    playsInline
                                    autoPlay
                                    loop
                                />
                            </div>
                        </CarouselItem>
                    ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4 hidden md:flex" />
                    <CarouselNext className="right-4 hidden md:flex" />
                </Carousel>
            </div>
        </section>

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
