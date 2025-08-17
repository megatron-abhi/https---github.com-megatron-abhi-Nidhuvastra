import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/mock-data';

export default function SilkSareesPage() {
  const silkProducts = products.filter(p => p.category === 'Silk Sarees');

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline text-foreground">Silk Sarees</h1>
          <p className="text-lg text-muted-foreground mt-2">Discover the timeless luxury of pure silk, woven to perfection.</p>
        </div>

        {silkProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {silkProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No silk sarees found at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
