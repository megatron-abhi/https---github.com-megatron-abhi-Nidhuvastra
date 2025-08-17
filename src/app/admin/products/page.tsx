import Image from 'next/image';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { products } from '@/lib/mock-data';

export default function ProductsPage() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold md:text-2xl">Products</h1>
        <div className="ml-auto flex items-center gap-2">
            <Link href="/admin/products/new">
                <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Product
                    </span>
                </Button>
            </Link>
        </div>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Your Sarees</CardTitle>
          <CardDescription>
            Manage your collection and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden md:table-cell">
                  Total Sales
                </TableHead>
                <TableHead className="hidden md:table-cell">Created at</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map(product => (
                <TableRow key={product.id}>
                   <TableCell className="hidden sm:table-cell">
                    <Image
                      alt={product.name}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={product.images[0].src}
                      width="64"
                      data-ai-hint={product.images[0].aiHint}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">Active</Badge>
                  </TableCell>
                  <TableCell>₹{product.price.toLocaleString('en-IN')}</TableCell>
                   <TableCell className="hidden md:table-cell">25</TableCell>
                  <TableCell className="hidden md:table-cell">
                    2023-07-12 10:42 AM
                  </TableCell>
                   <TableCell>
                    {/* Add actions here later */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-{products.length}</strong> of <strong>{products.length}</strong> products
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
