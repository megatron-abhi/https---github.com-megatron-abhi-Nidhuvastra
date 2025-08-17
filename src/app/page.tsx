import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/mock-data';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featuredProducts = products.filter(p => !p.isExclusive).slice(0, 4);
  const exclusiveProducts = products.filter(p => p.isExclusive);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[90vh] w-full flex items-center justify-start text-left text-white overflow-hidden">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative z-10 p-4 animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline mb-4 text-gray-100 drop-shadow-lg">
                        Modern sarees.
                    </h1>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline mb-6 text-gray-100 drop-shadow-lg">
                        Effortless elegance.
                    </h1>
                    <p className="text-lg md:text-xl max-w-xl mb-8 text-gray-300 drop-shadow-md">
                        Experience premium Indian sarees designed for comfort, quality, and modern elegance.
                    </p>
                    <Button asChild size="lg" variant="secondary">
                        <Link href="/collections/all">Explore Collections</Link>
                    </Button>
                </div>
                 <div className="relative h-[40vh] md:h-[60vh] w-full ">
                     <Image
                        src="https://placehold.co/800x1000.png"
                        alt="Elegant saree model"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-2xl shadow-2xl transform -rotate-3 transition-transform duration-500 hover:rotate-0"
                        data-ai-hint="saree fashion model"
                    />
                     <Image
                        src="https://placehold.co/600x450.png"
                        alt="Artisan weaving a saree"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-2xl shadow-2xl absolute top-1/2 left-1/4 w-1/2 h-1/2 transform rotate-6 transition-transform duration-500 hover:rotate-0"
                        data-ai-hint="indian textile lifestyle"
                    />
                 </div>
            </div>
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
                src="https://placehold.co/600x450.png"
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
