import Link from 'next/link';

export default async function Dashboard() {
  // Fetch item data from the Prisma database
  // const items = await prisma.item.findMany(); // Adjust the model name as needed
  // const data = items.map(item => ({
  //   id: item.id, // Ensure you have a unique identifier
  //   description: item.description,
  //   type: item.type,
  //   price: item.price,
  // }));

  // const data = await fetchItems(); // Fetches 20 items by default
  return (
    <main className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto min-h-screen px-4">
      <div className="w-full pt-8"></div>

      <div className="flex justify-between items-end w-full">
        <h1 className="text-[48px] font-bold">Items</h1>
      </div>

      <div className="w-full bg-[#F2F2F2] rounded-[30px] p-[30px]">
        <div className="w-full mt-4 -400"></div>
      </div>
    </main>
  );
}
