import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/mock-data';

export default function DesignerSareesPage() {
  // Assuming 'Georgette Sarees' and 'Printed Sarees' can be considered 'Designer' for this example
  const designerProducts = products.filter(p => ['Georgette Sarees', 'Printed Sarees'].includes(p.category));

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline text-foreground">Designer Sarees</h1>
          <p className="text-lg text-muted-foreground mt-2">Contemporary designs for the modern fashionista.</p>
        </div>

        {designerProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {designerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No designer sarees found at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
