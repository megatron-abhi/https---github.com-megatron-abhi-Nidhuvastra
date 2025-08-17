import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/mock-data';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
        <Image
          src="https://placehold.co/1800x900.png"
          alt="Elegant saree model"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 brightness-50"
          data-ai-hint="saree fashion model"
        />
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline mb-4 text-gray-100">
            Draped in Heritage
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-200">
            Experience the timeless elegance of authentic Indian sarees, crafted
            with passion and precision.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/#featured-products">Shop Now</Link>
          </Button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured-products" className="py-16 lg:py-24">
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
              <Link href="/products">
                View All Collections <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Brand Story Teaser */}
      <section className="bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 py-16 lg:py-24">
            <div className="md:w-1/2 w-full">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Artisan weaving a saree"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full"
                data-ai-hint="indian textile lifestyle"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-3xl md:text-4xl font-headline mb-4">
                The Art of Saree Making
              </h3>
              <p className="text-muted-foreground mb-6 text-lg">
                Each SareeShree creation is a testament to the rich legacy of Indian craftsmanship. We partner with skilled artisans across the country to bring you sarees that are not just garments, but stories woven in thread.
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
