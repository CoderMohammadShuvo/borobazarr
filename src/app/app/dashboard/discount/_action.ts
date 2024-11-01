'use server';
import prisma from '../../../../prisma';
import { revalidatePath } from 'next/cache';

// Handle creating a new discount
export const createDiscount = async (data: any) => {
  try {
    const {
      percentage,
      startDate,
      endDate,
      oldPrice,
      newPrice,
      productId,
      franchise,
    } = data;

    if (
      !percentage ||
      !startDate ||
      !endDate ||
      !oldPrice ||
      !newPrice ||
      !productId ||
      !franchise
    ) {
      return false; // Ensure all required fields are present
    }

    const newDiscount = await prisma.discount.create({
      data: {
        percentage,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        oldPrice,
        newPrice,
        product: { connect: { id: productId } },
        franchise,
      },
    });

    if (newDiscount) {
      console.log('Discount created successfully!');
      revalidatePath('/dashboard/discounts'); // Adjust the path as needed
      return newDiscount;
    }
  } catch (err) {
    console.error('Error creating discount:', err);
    return false;
  }
};

// Handle updating an existing discount
export const updateDiscount = async (id: string, data: any) => {
  try {
    const {
      percentage,
      startDate,
      endDate,
      oldPrice,
      newPrice,
      productId,
      franchise,
    } = data;

    if (
      !percentage ||
      !startDate ||
      !endDate ||
      !oldPrice ||
      !newPrice ||
      !productId ||
      !franchise
    ) {
      return false; // Ensure all required fields are present
    }

    const updatedDiscount = await prisma.discount.update({
      where: { id: id },
      data: {
        percentage,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        oldPrice,
        newPrice,
        product: { connect: { id: productId } },
        franchise,
      },
    });

    if (updatedDiscount) {
      console.log('Discount updated successfully!');
      revalidatePath('/dashboard/discounts'); // Adjust the path as needed
      return updatedDiscount;
    }
  } catch (err) {
    console.error('Error updating discount:', err);
    return false;
  }
};

// Handle deleting a discount by its ID
export const handleDeleteDiscount = async (id: string) => {
  try {
    const deletedDiscount = await prisma.discount.delete({
      where: {
        id: id,
      },
    });

    if (deletedDiscount) {
      console.log('Discount deleted successfully!');
      revalidatePath('/dashboard/discounts'); // Adjust the path as needed
      return deletedDiscount;
    }
  } catch (err) {
    console.error('Error deleting discount:', err);
    return false;
  }
};

// Fetch a discount by its ID
export const getDiscountById = async (id: string) => {
  try {
    const discount = await prisma.discount.findUnique({
      where: {
        id: id,
      },
    });

    if (discount) {
      return discount;
    }
  } catch (err) {
    console.error('Error fetching discount:', err);
    return null;
  }
};

// Optional: Fetch all discounts (for listing purposes)
export const getAllDiscounts = async () => {
  try {
    const discounts = await prisma.discount.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return discounts;
  } catch (err) {
    console.error('Error fetching discounts:', err);
    return [];
  }
};
