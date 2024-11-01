'use client';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { format } from 'date-fns';
import { findProduct } from '../products/_action';
import { createDiscount } from './_action';

// Define Zod schema for discount form validation
const DiscountSchema = z.object({
  percentage: z
    .number()
    .min(1, { message: 'Percentage must be at least 1.' })
    .max(100, { message: 'Percentage cannot exceed 100.' }),
  startDate: z.date(),
  endDate: z.date(),
  oldPrice: z.number().positive('Old price must be positive.'),
  newPrice: z.number().positive('New price must be positive.'),
  productId: z.string().nonempty('Product is required.'),
  franchise: z.string().nonempty('Franchise is required.'),
});

// Infer the TypeScript type from the Zod schema
type DiscountFormType = z.infer<typeof DiscountSchema>;

const CreateDiscount = () => {
  const [formData, setFormData] = useState<DiscountFormType>({
    percentage: 0,
    startDate: new Date(),
    endDate: new Date(),
    oldPrice: 0,
    newPrice: 0,
    productId: '',
    franchise: '',
  });
  const [productOptions, setProductOptions] = useState<string[]>([]); // Dynamic product options
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle form input changes
  const handleInputChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === 'percentage') {
      const percentage = Number(value);
      const newPrice =
        formData.oldPrice - (formData.oldPrice * percentage) / 100;
      setFormData({ ...formData, percentage, newPrice });
    } else if (name === 'oldPrice') {
      const oldPrice = Number(value);
      const newPrice = oldPrice - (oldPrice * formData.percentage) / 100;
      setFormData({ ...formData, oldPrice, newPrice });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (name === 'productId') {
      // Fetch product options based on search query
      const products = await findProduct(value); // Call findProduct with the input value
      setProductOptions(products); // Update product options with search results
      setShowDropdown(products.length > 0); // Show dropdown if results exist
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate with Zod
    const validation = DiscountSchema.safeParse(formData);
    if (!validation.success) {
      setError(validation.error.errors[0]?.message || 'Validation failed');
      return;
    }

    try {
      // Call the createDiscount function
      const createdDiscount = await createDiscount(formData);
      console.log('Discount created successfully:', createdDiscount);

      // Reset form after submission
      setFormData({
        percentage: 0,
        startDate: new Date(),
        endDate: new Date(),
        oldPrice: 0,
        newPrice: 0,
        productId: '',
        franchise: '',
      });
    } catch (error) {
      setError('Failed to create discount. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Create Discount
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="percentage"
            className="block text-sm font-medium text-gray-700"
          >
            Discount Percentage:
          </label>
          <input
            type="number"
            id="percentage"
            name="percentage"
            value={formData.percentage}
            onChange={handleInputChange}
            min={1}
            max={100}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date:
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={format(formData.startDate, 'yyyy-MM-dd')}
            onChange={(e) =>
              setFormData({ ...formData, startDate: new Date(e.target.value) })
            }
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            End Date:
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={format(formData.endDate, 'yyyy-MM-dd')}
            onChange={(e) =>
              setFormData({ ...formData, endDate: new Date(e.target.value) })
            }
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="oldPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Old Price:
          </label>
          <input
            type="number"
            id="oldPrice"
            name="oldPrice"
            value={formData.oldPrice}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="newPrice"
            className="block text-sm font-medium text-gray-700"
          >
            New Price:
          </label>
          <input
            type="number"
            id="newPrice"
            name="newPrice"
            value={formData.newPrice}
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="productId"
            className="block text-sm font-medium text-gray-700"
          >
            Product ID:
          </label>
          <input
            type="text"
            id="productId"
            name="productId"
            value={formData.productId}
            onChange={handleInputChange}
            required
            placeholder="Search for product..."
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            onFocus={() => setShowDropdown(true)}
          />
          {showDropdown && (
            <ul className="mt-1 border border-gray-300 bg-white shadow-lg rounded-md max-h-28 overflow-auto">
              {productOptions.map((product) => (
                <li
                  key={product}
                  onClick={() => {
                    setFormData({ ...formData, productId: product.id });
                    setShowDropdown(false); // Hide dropdown on selection
                  }}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {product.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label
            htmlFor="franchise"
            className="block text-sm font-medium text-gray-700"
          >
            Franchise:
          </label>
          <input
            type="text"
            id="franchise"
            name="franchise"
            value={formData.franchise}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Discount
        </button>
      </form>
    </div>
  );
};

export default CreateDiscount;
