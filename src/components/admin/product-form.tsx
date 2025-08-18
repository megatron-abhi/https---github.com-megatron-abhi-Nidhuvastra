
'use client';

import Image from 'next/image';
import { Upload, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { Product } from '@/types';
import { useForm, Controller } from 'react-hook-form';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ProductFormProps {
    initialData?: Product;
    onSave: (data: Product) => void;
}

export function ProductForm({ initialData, onSave }: ProductFormProps) {
    const { register, handleSubmit, control, formState: { errors }, watch } = useForm<Product>({
        defaultValues: initialData || {
            name: '',
            description: '',
            price: 0,
            originalPrice: 0,
            stock: 0,
            category: 'Silk Sarees',
            colors: [],
            images: [
                { src: '/images/placeholder.png', alt: 'Placeholder 1', aiHint: 'placeholder' },
                { src: '/images/placeholder.png', alt: 'Placeholder 2', aiHint: 'placeholder' },
                { src: '/images/placeholder.png', alt: 'Placeholder 3', aiHint: 'placeholder' },
            ],
            status: 'draft',
            isExclusive: false,
            promotion: undefined,
            offerEndDate: undefined,
        }
    });

    const isExclusive = watch('isExclusive');
    const promotionType = watch('promotion');
    
    const onSubmit = (data: any) => {
        const processedData = {
            ...data,
            colors: typeof data.colors === 'string' ? data.colors.split(',').map(s => s.trim()) : data.colors,
            // Ensure promotion fields are cleared if not exclusive
            promotion: data.isExclusive ? data.promotion : undefined,
            offerEndDate: data.isExclusive && data.promotion === 'Limited Time' ? data.offerEndDate : undefined,
        };
        onSave(processedData);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
             <div className="flex items-center gap-4">
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Button variant="outline" type="button">Discard</Button>
                    <Button type="submit">Save Product</Button>
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>
                      Provide the name, description, and other essential details for your saree.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          type="text"
                          className="w-full"
                          {...register('name', { required: 'Name is required' })}
                        />
                        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          className="min-h-32"
                          {...register('description', { required: 'Description is required' })}
                        />
                        {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Stock & Pricing</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="grid gap-6 sm:grid-cols-3">
                      <div className="grid gap-3">
                        <Label htmlFor="price">Price (₹)</Label>
                        <Input id="price" type="number" {...register('price', { required: true, valueAsNumber: true })} />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="originalPrice">Original Price (₹)</Label>
                        <Input id="originalPrice" type="number" {...register('originalPrice', { valueAsNumber: true })} />
                      </div>
                       <div className="grid gap-3">
                        <Label htmlFor="stock">Stock</Label>
                        <Input id="stock" type="number" {...register('stock', { required: true, valueAsNumber: true })} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Category & Colors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="grid gap-3">
                        <Label htmlFor="category">Category</Label>
                        <Controller
                            name="category"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger id="category" aria-label="Select category">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Silk Sarees">Silk Sarees</SelectItem>
                                        <SelectItem value="Cotton Sarees">Cotton Sarees</SelectItem>
                                        <SelectItem value="Designer Sarees">Designer Sarees</SelectItem>
                                        <SelectItem value="Georgette Sarees">Georgette Sarees</SelectItem>
                                        <SelectItem value="Printed Sarees">Printed Sarees</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="colors">Colors</Label>
                        <Input 
                            id="colors" 
                            type="text" 
                            placeholder="Maroon, Gold" 
                            {...register('colors')}
                            defaultValue={Array.isArray(initialData?.colors) ? initialData.colors.join(', ') : ''}
                        />
                         <p className="text-xs text-muted-foreground">Comma-separated values.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Promotions</CardTitle>
                        <CardDescription>
                            Manage exclusive status and limited-time offers for this product.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center space-x-2">
                            <Controller
                                name="isExclusive"
                                control={control}
                                render={({ field }) => (
                                    <Switch
                                        id="isExclusive"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                )}
                            />
                             <Label htmlFor="isExclusive">Exclusive Product</Label>
                        </div>

                        {isExclusive && (
                           <div className="grid gap-6 sm:grid-cols-2">
                               <div className="grid gap-3">
                                    <Label htmlFor="promotion">Promotion Type</Label>
                                    <Controller
                                        name="promotion"
                                        control={control}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger id="promotion" aria-label="Select promotion type">
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Limited Time">Limited Time</SelectItem>
                                                    <SelectItem value="Limited Stock">Limited Stock</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                               </div>
                               {promotionType === 'Limited Time' && (
                                   <div className="grid gap-3">
                                       <Label htmlFor="offerEndDate">Offer End Date</Label>
                                        <Controller
                                            name="offerEndDate"
                                            control={control}
                                            render={({ field }) => (
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            className={cn(
                                                            "w-full justify-start text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value ? new Date(field.value) : undefined}
                                                            onSelect={(date) => field.onChange(date?.toISOString())}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            )}
                                        />
                                   </div>
                               )}
                           </div>
                        )}
                    </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>Product Images</CardTitle>
                    <CardDescription>
                      Add up to 3 images for your product.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="300"
                        src={initialData?.images?.[0]?.src || '/images/placeholder.png'}
                        width="300"
                        data-ai-hint="placeholder"
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <button type="button">
                          <Image
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="84"
                            src={initialData?.images?.[1]?.src || '/images/placeholder.png'}
                            width="84"
                            data-ai-hint="placeholder"
                          />
                        </button>
                        <button type="button">
                           <Image
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="84"
                            src={initialData?.images?.[2]?.src || '/images/placeholder.png'}
                            width="84"
                             data-ai-hint="placeholder"
                          />
                        </button>
                        <button type="button" className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          <span className="sr-only">Upload</span>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="status">Status</Label>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value as string || 'draft'}>
                                <SelectTrigger id="status" aria-label="Select status">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                </SelectContent>
                                </Select>
                            )}
                         />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm" type="button">Discard</Button>
              <Button size="sm" type="submit">Save Product</Button>
            </div>
        </form>
    )
}
