'use client';

import { ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import button from '@components/ui/button';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import CreateUserSheet from './createProductSheet';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@components/ui/sheet';
import Link from 'next/link';
import axios from 'axios';
import { UpdateUserStatus, handleDelete } from './_action';
import { useState } from 'react';
import StatusUpdatePop from '@components/StatusUpdatePop';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  id: string;
  name: string;
  username: string;
  phone: string;
  status: 'Active' | 'Inactive';
  email: string;
  type: string;
};

const handleDeleteTigger = async (id: string) => {
  const del = await handleDelete(id);
  if (del) {
    `Offer Delete Successful!`;
    // toast.success(`${del.name} deleted successful!`);
  } else {
    `Deleted Faild!`;
  }
};

// Separate ActionCell component to handle the cell logic
const ActionCell = ({ user }: { user: User }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [status, setStatus] = useState('');

  const handleUpdate = (operation: string) => {
    setStatus(operation);
    setAlertOpen(true);
  };

  const updateStatus = async () => {
    setAlertOpen(false);
    const updateStatus = await UpdateUserStatus(user.id, status);
    if (updateStatus) {
      console.log('success');
    } else {
      console.log('failed');
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={`/dashboard/users/${user.id}`}>Edit</Link>
          </DropdownMenuItem>
          {user.status === 'Active' ? (
            <DropdownMenuItem onClick={() => handleUpdate('Inactive')}>
              Inactive
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => handleUpdate('Active')}>
              Active
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <StatusUpdatePop
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        updateStatus={updateStatus}
        model="User"
        operation={status}
      />
    </>
  );
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'country',
    header: 'Country',
  },
  {
    accessorKey: 'size',
    header: 'Size',
  },
  {
    accessorKey: 'franchise',
    header: 'Franchise',
  },
  {
    accessorKey: 'amount',
    header: () => <div>Action</div>,
    id: 'actions',
    cell: ({ row }) => <ActionCell user={row.original} />, // Use the new ActionCell component
  },
];
