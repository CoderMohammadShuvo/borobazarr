'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import Button from '@components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { createProduct } from './_action';
import { revalidatePath } from 'next/cache';

// Define the validation schema for the form using Zod
const ProductFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  image: z.string().url('Image URL is required'),
  description: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  size: z.string().min(1, 'Size is required'),
  franchise: z.string().min(1, 'Franchise is required'),
  // Optional: you can add validation for discounts if needed
});

type ProductFormData = z.infer<typeof ProductFormSchema>;

export default function ProductForm() {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      name: '',
      image: '',
      description: '',
      country: '',
      size: '',
      franchise: '',
    },
  });

  async function onSubmit(data: any) {
    try {
      //@ts-ignore
      const newProduct = await createProduct(data);
      console.log('newUser', newProduct);

      if (newProduct) {
        toast.success('User Creation Success');
        revalidatePath('/dashboard/products');
        form.reset();
        //   router.back();
      } else {
        toast.error('User Creatation faield!');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-5/6 space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Product Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Country of Origin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <Input placeholder="Product Size" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="franchise"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Franchise</FormLabel>
                <FormControl>
                  <Input placeholder="Franchise" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Optional: Add discount fields or discount management UI if necessary */}
          <Button type="submit">Create Product</Button>
        </form>
      </Form>
      <Toaster />
    </div>
  );
}
