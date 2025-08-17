'use client';
import { useState, useMemo } from 'react';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/mock-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

const allCategories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
const maxPrice = Math.max(...products.map(p => p.price));

export default function AllProductsPage() {
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [sort, setSort] = useState('rating-desc');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const categoryMatch = category === 'All' || product.category === category;
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      return categoryMatch && priceMatch;
    });

    switch (sort) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [category, priceRange, sort]);

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline text-foreground">Our Collections</h1>
          <p className="text-lg text-muted-foreground mt-2">Browse our curated selection of exquisite sarees.</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters */}
          <aside className="lg:col-span-1 bg-card p-6 rounded-lg shadow-sm h-fit sticky top-24">
            <h3 className="text-xl font-semibold mb-6">Filters</h3>
            <div className="space-y-6">
              <div>
                <Label className="text-base font-semibold">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {allCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-base font-semibold">Price Range</Label>
                <Slider
                  defaultValue={[maxPrice]}
                  max={maxPrice}
                  step={100}
                  onValueChange={([val]) => setPriceRange([0, val])}
                  className="my-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹0</span>
                  <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
                </div>
              </div>
               <div>
                <Label className="text-base font-semibold">Sort By</Label>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Sort products" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating-desc">Popularity</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="name-asc">Alphabetical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-3">
            {filteredAndSortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-center h-full bg-card p-12 rounded-lg">
                    <h3 className="text-2xl font-semibold">No Products Found</h3>
                    <p className="text-muted-foreground mt-2">Try adjusting your filters to find what you're looking for.</p>
                </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
