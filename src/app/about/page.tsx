import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-headline text-foreground">Our Story</h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
            Weaving threads of tradition with contemporary elegance, NidhuVastra is more than just a brand; it's a celebration of Indian heritage.
          </p>
        </div>

        {/* Our Mission Section */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 mb-24">
          <div className="md:w-1/2 w-full">
            <Image
              src="/images/5.jpg"
              alt="Artisan weaving a saree with intricate details"
              width={600}
              height={450}
              className="rounded-lg shadow-lg w-full"
              data-ai-hint="indian textile lifestyle"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-headline mb-4">The Art of Saree Making</h2>
            <p className="text-muted-foreground mb-4 text-lg">
              Each NidhuVastra creation is a testament to the rich legacy of Indian craftsmanship. We partner with skilled artisans across the country—from the bustling looms of Kanchipuram to the serene villages of Bengal—to bring you sarees that are not just garments, but stories woven in thread.
            </p>
            <p className="text-muted-foreground text-lg">
              Our mission is to preserve these timeless art forms while innovating for the modern woman. We believe in sustainable practices, fair wages, and empowering our weaver communities.
            </p>
          </div>
        </div>
        
        {/* Our Values Section */}
        <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-headline mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-card p-8 rounded-lg">
                    <h3 className="text-2xl font-semibold mb-2">Authenticity</h3>
                    <p className="text-muted-foreground">Genuine handloom sarees sourced directly from artisan communities.</p>
                </div>
                 <div className="bg-card p-8 rounded-lg">
                    <h3 className="text-2xl font-semibold mb-2">Quality</h3>
                    <p className="text-muted-foreground">Uncompromising standards for fabric, weave, and finishing.</p>
                </div>
                 <div className="bg-card p-8 rounded-lg">
                    <h3 className="text-2xl font-semibold mb-2">Empowerment</h3>
                    <p className="text-muted-foreground">Supporting the livelihood and craft of our talented weavers.</p>
                </div>
            </div>
        </div>

        {/* CTA Section */}
        <div className="bg-secondary/30 rounded-lg p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-headline mb-4">Discover Your Perfect Saree</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Ready to experience the elegance of a NidhuVastra saree? Explore our curated collections and find a piece that tells your story.
            </p>
            <Button asChild size="lg">
                <Link href="/collections/all">
                    Explore Collections <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
