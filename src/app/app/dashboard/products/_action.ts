'use server';
import prisma from '../../../../prisma';
import { revalidatePath } from 'next/cache';
import { getBrowserInfo, getDeviceType } from 'src/app/lib/deviceDetect';
import { any, z } from 'zod';

// Define TypeScript type from the ProductFormSchema

// Handle deleting a product by its ID
export const handleDeleteProduct = async (id: string) => {
  try {
    const product = await prisma.product.delete({
      where: {
        id: id,
      },
    });

    if (product) {
      console.log(`${product.name} deleted successfully!`);
      revalidatePath('/dashboard/products'); // Adjust the path as needed
      return product;
    }
  } catch (err) {
    console.error('Error deleting product:', err);
    return false;
  }
};

// Handle creating a new product
export const createProduct = async (data: any) => {
  try {
    // Destructure data and validate required fields
    const { name, image, description, country, size, franchise, discounts } =
      data;

    if (!name || !image || !country || !size || !franchise) return false;

    const newProduct = await prisma.product.create({
      data: {
        name,
        image,
        description,
        country,
        size,
        franchise,
        discounts: {
          connect: discounts?.map((discount) => ({ id: discount.id })), // Connect existing discounts by ID
        },
      },
    });

    if (newProduct) {
      console.log(`${newProduct.name} created successfully!`);
      revalidatePath('/dashboard/products'); // Adjust the path as needed
      return newProduct;
    }
  } catch (err) {
    console.error('Error creating product:', err);
    return false;
  }
};

// Handle updating an existing product
export const updateProduct = async (id: string, data: any) => {
  try {
    const { name, image, description, country, size, franchise, discounts } =
      data;

    if (!name || !image || !country || !size || !franchise) return false;

    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: {
        name,
        image,
        description,
        country,
        size,
        franchise,
        discounts: {
          set: [], // Clears existing discounts
          connect: discounts?.map((discount) => ({ id: discount.id })), // Connect updated discounts by ID
        },
      },
    });

    if (updatedProduct) {
      console.log(`${updatedProduct.name} updated successfully!`);
      revalidatePath('/dashboard/products');
      return updatedProduct;
    }
  } catch (err) {
    console.error('Error updating product:', err);
    return false;
  }
};

// Handle updating the status of a product
export const updateProductStatus = async (id: string, status: string) => {
  try {
    const update = await prisma.product.update({
      where: { id: id },
      data: { status: status },
    });

    if (update) {
      console.log('Product status updated successfully');
      revalidatePath('/dashboard/products');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating product status:', error);
    return false;
  }
};

export const findProduct = async (name: string) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: name, // Searches for products with names containing the specified string
          mode: 'insensitive', // Case-insensitive search
        },
      },
    });

    if (products.length > 0) {
      console.log(
        `Found ${products.length} product(s) with the name "${name}"`,
      );
      return products;
    } else {
      console.log(`No products found with the name "${name}"`);
      return [];
    }
  } catch (err) {
    console.error('Error finding product by name:', err);
    return [];
  }
};

// Optional: Handle creating a product log entry (for tracking purposes)
// export const createProductLog = async (
//   productId: string,
//   action: string,
//   userId: string,
//   module: string,
//   route: string
// ) => {
//   try {
//     const deviceInfo = getDeviceType();
//     const browserInfo = getBrowserInfo();

//     const createProductLog = await prisma.productLogs.create({
//       data: {
//         productId,
//         action,
//         userId,
//         module,
//         date: new Date(),
//         userAgent: {
//           deviceInfo: deviceInfo,
//           browserInfo: browserInfo,
//           routeInfo: route,
//         },
//       },
//     });

//     if (createProductLog) {
//       console.log("Product log created successfully");
//       return createProductLog;
//     }
//   } catch (err) {
//     console.error("Error creating product log:", err);
//     return false;
//   }
// };
