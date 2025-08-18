
'use client';
import { useRouter, notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/mock-data';
import { ProductForm } from '@/components/admin/product-form';

export default function EditProductPage({ params }: { params: { slug: string } }) {
    const router = useRouter();
    const product = products.find(p => p.slug === params.slug);

    if (!product) {
        notFound();
    }

    const handleSave = (values: any) => {
        console.log("Product Updated:", values);
        // Here you would typically call an API to update the product in your database.
        // For this demo, we'll just log it and redirect.
        alert('Product updated! (Check console for data)');
        router.push('/admin/products');
    }

  return (
    <div className="flex min-h-screen w-full flex-col">
       <div className="flex flex-col sm:gap-4">
         <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Link href="/admin/products">
                <Button size="icon" variant="outline" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back to Products</span>
                </Button>
            </Link>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Edit Saree
            </h1>
         </header>
         <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <ProductForm onSave={handleSave} initialData={product} />
         </main>
       </div>
    </div>
  );
}
