import Link from 'next/link';
import CreateUserSheet from './createProductSheet';
import { UserDataTable } from './data-table';
import { columns } from './columns';
import prisma from '../../../../prisma';

export default async function Products() {
  // Fetch item data from the Prisma database
  // const items = await prisma.item.findMany(); // Adjust the model name as needed
  // const data = items.map(item => ({
  //   id: item.id, // Ensure you have a unique identifier
  //   description: item.description,
  //   type: item.type,
  //   price: item.price,
  // }));

  const data: any = await prisma.product.findMany({});

  console.log('data', data);

  // const data = await fetchItems(); // Fetches 20 items by default
  return (
    <main className="flex min-h-screen flex-col w-full ">
      <div className=" flex-col flex w-full ">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <div className="flex items-center space-x-2">
              {/* <CalendarDateRangePicker /> */}
              <CreateUserSheet />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
            <UserDataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </main>
  );
}
