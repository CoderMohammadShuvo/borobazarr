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
import CreateUserSheet from './createUserSheet';

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

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: 'username',
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Phone
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'amount',
    header: () => <div className="">Action</div>,
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;
      const [alertOpen, setAlertOpen] = useState(false);
      const [status, setStatus] = useState('');
      const handleUpdate = (operation: string) => {
        setStatus(operation);
        setAlertOpen(true);
      };

      // Alert Function
      const updateStatus = async () => {
        setAlertOpen(false);
        const updateStatus = await UpdateUserStatus(user.id, status);
        //@ts-ignore
        if (updateStatus) {
          // tosst successfully updated
          console.log('success');
        } else {
          // toast successfully failed
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
              {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              View Details
            </DropdownMenuItem> */}
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
    },
  },
];
