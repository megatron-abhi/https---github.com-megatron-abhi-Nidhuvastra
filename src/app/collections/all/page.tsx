
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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const allCategories = [...Array.from(new Set(products.map(p => p.category)))];
const allColors = [...new Set(products.flatMap(p => p.colors))];
const maxPrice = Math.max(...products.map(p => p.price));

export default function AllProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sort, setSort] = useState('rating-desc');

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const handleColorChange = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      const colorMatch = selectedColors.length === 0 || product.colors.some(c => selectedColors.includes(c));
      return categoryMatch && priceMatch && colorMatch;
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
  }, [selectedCategories, priceRange, selectedColors, sort]);
  
  const colorMap: { [key: string]: string } = {
    'Maroon': 'bg-rose-900',
    'Gold': 'bg-yellow-500',
    'Beige': 'bg-amber-100',
    'Silver': 'bg-gray-400',
    'Ivory': 'bg-stone-100',
    'Red': 'bg-red-600',
    'Yellow': 'bg-yellow-400',
    'Green': 'bg-green-600'
  };

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline text-foreground">Our Collections</h1>
          <p className="text-lg text-muted-foreground mt-2">Browse our curated selection of exquisite sarees.</p>
        </div>

        <div className="grid lg:grid-cols-4 lg:gap-8">
          {/* Filters */}
          <aside className="lg:col-span-1 lg:sticky lg:top-24 h-fit">
            <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-6">Filter by</h3>
                <div className="space-y-6">
                <div>
                    <Label className="text-base font-semibold">Product type</Label>
                    <div className="space-y-2 mt-2">
                    {allCategories.map(cat => (
                        <div key={cat} className="flex items-center space-x-2">
                        <Checkbox 
                            id={cat} 
                            checked={selectedCategories.includes(cat)} 
                            onCheckedChange={() => handleCategoryChange(cat)}
                        />
                        <Label htmlFor={cat} className="font-normal cursor-pointer">{cat}</Label>
                        </div>
                    ))}
                    </div>
                </div>
                <div>
                    <Label className="text-base font-semibold">Price</Label>
                    <Slider
                    defaultValue={[0, maxPrice]}
                    max={maxPrice}
                    min={0}
                    step={100}
                    onValueChange={setPriceRange}
                    className="my-4"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
                    <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
                    </div>
                </div>
                <div>
                    <Label className="text-base font-semibold">Color</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                    {allColors.map(color => (
                        <button 
                        key={color} 
                        onClick={() => handleColorChange(color)}
                        className={cn(
                            "w-8 h-8 rounded-full border-2",
                            selectedColors.includes(color) ? 'border-primary' : 'border-transparent',
                            colorMap[color] || 'bg-gray-200'
                        )}
                        aria-label={`Filter by color ${color}`}
                        />
                    ))}
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
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-3 mt-8 lg:mt-0">
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
