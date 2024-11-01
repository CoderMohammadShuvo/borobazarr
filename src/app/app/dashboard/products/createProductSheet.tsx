import Button from '@components/ui/button';
import { Input } from '@components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@components/ui/sheet';
import React from 'react';
import ProductForm from './ProductForm';

function CreateProductSheet() {
  return (
    <div className="bg-white">
      <Sheet>
        <SheetTrigger>
          <Button type="submit">Create Product</Button>
        </SheetTrigger>
        <SheetContent className="bg-white">
          <SheetHeader>
            <SheetTitle>Create New Product</SheetTitle>
            <SheetDescription>
              <ProductForm />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default CreateProductSheet;
