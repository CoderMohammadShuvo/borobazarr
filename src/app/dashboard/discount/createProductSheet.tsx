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
import DiscountForm from './DiscountForm';

function CreateDiscountSheet() {
  return (
    <div className="bg-white">
      <Sheet>
        <SheetTrigger>
          <Button type="submit">Add Discount</Button>
        </SheetTrigger>
        <SheetContent className="bg-white">
          <SheetHeader>
            <SheetTitle>Add New Discount</SheetTitle>
            <SheetDescription>
              <DiscountForm />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default CreateDiscountSheet;
