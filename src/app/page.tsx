
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
import { type CarouselApi } from "@/components/ui/carousel"
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';


const heroImages = [
    { src: '/images/1.jpg', alt: 'Saree model', aiHint: 'saree fashion model' },
    { src: '/images/2.jpg', alt: 'Saree detail', aiHint: 'indian textile lifestyle' },
    { src: '/images/3.jpg', alt: 'Weaving loom', aiHint: 'saree weaving artisan' },
    { src: '/images/4.jpg', alt: 'Another saree model', aiHint: 'saree office wear' },
];


export default function Home() {
  const featuredProducts = products.filter(p => !p.isExclusive).slice(0, 4);
  const exclusiveProducts = products.filter(p => p.isExclusive);
  const videoSources = ['/videos/showcase.mp4', '/videos/showcase2.mp4', '/videos/showcase3.mp4'];
  const [api, setApi] = React.useState<CarouselApi>()
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);
  const isMobile = useIsMobile();
  const [scale, setScale] = React.useState<number[]>([]);
  const [translateX, setTranslateX] = React.useState<number[]>([]);
  const [zIndex, setZIndex] = React.useState<number[]>([]);

  const handleSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    const selectedIndex = api.selectedScrollSnap();
    videoRefs.current.forEach((video, index) => {
        if (video) {
            if (index === selectedIndex) {
                video.play();
            } else {
                video.pause();
                video.currentTime = 0;
            }
        }
    });
  }, []);

  const handleScroll = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    const scrollProgress = api.scrollProgress();
    const newScale = api.scrollSnapList().map((snap, index) => {
        const distance = Math.abs(snap - scrollProgress);
        return 1 - distance * 0.2;
    });
    const newTranslateX = api.scrollSnapList().map((snap, index) => {
        const distance = snap - scrollProgress;
        return distance * -50; // Pulls items closer
    });
     const newZIndex = api.scrollSnapList().map((snap, index) => {
        const distance = Math.abs(snap - scrollProgress);
        return 10 - Math.floor(distance * 10);
    });
    
    setScale(newScale);
    setTranslateX(newTranslateX);
    setZIndex(newZIndex);
  }, []);

  React.useEffect(() => {
    if (!api) {
      return
    }
    
    handleSelect(api);
    handleScroll(api);
    api.on("select", handleSelect);
    api.on("scroll", handleScroll);

    return () => {
      api.off("select", handleSelect);
      api.off("scroll", handleScroll);
    }
  }, [api, handleSelect, handleScroll])


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
                           <Image src="/images/1.jpg" alt="Saree model" fill objectFit="cover" data-ai-hint="saree fashion model" />
                        </div>
                         <div className="h-[40vh] relative rounded-2xl shadow-2xl overflow-hidden">
                           <Image src="/images/2.jpg" alt="Saree detail" fill objectFit="cover" data-ai-hint="indian textile lifestyle" />
                        </div>
                    </div>
                    <div className="w-1/2 space-y-4 animate-marquee-vertical-fast -translate-y-1/4">
                       <div className="h-[40vh] relative rounded-2xl shadow-2xl overflow-hidden">
                           <Image src="/images/3.jpg" alt="Weaving loom" fill objectFit="cover" data-ai-hint="saree weaving artisan" />
                        </div>
                       <div className="h-[40vh] relative rounded-2xl shadow-2xl overflow-hidden">
                           <Image src="/images/4.jpg" alt="Another saree model" fill objectFit="cover" data-ai-hint="saree office wear" />
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
                <Carousel setApi={setApi} className="w-full" opts={{loop: true, align: 'center'}}>
                    <CarouselContent className="-ml-4 h-[70vh]">
                    {videoSources.map((src, index) => (
                        <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3 pl-4 flex items-center justify-center">
                        <div 
                            className="relative w-full aspect-[9/16] rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-out"
                            style={{
                                transform: `scale(${isMobile ? 1 : (scale[index] || 0.5)}) translateX(${isMobile ? 0 : (translateX[index] || 0)}%)`,
                                zIndex: zIndex[index]
                            }}
                        >
                            <video
                            ref={(el) => (videoRefs.current[index] = el)}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                            src={src}
                            muted
                            playsInline
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
                src="https://images.unsplash.com/photo-1596206583979-a73468b355d1?q=80&w=1974&auto=format&fit=crop"
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

    