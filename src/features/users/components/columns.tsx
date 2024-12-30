'use client';

import { ColumnDef } from '@tanstack/react-table';
import { SortColumnButton } from '@/components/custom/table';

type AdminUserColumns = {
  name: string;
  role: string;
  email: string;
  emailVerified: boolean;
};

export const AdminUserColumns: ColumnDef<AdminUserColumns>[] = [
  {
    accessorKey: 'name',
    enableHiding: true,
    enableSorting: true,
    header: ({ column }) => {
      return <SortColumnButton column={column} label="Name" />;
    },
  },
  {
    accessorKey: 'email',
    enableHiding: true,
    enableSorting: true,
    header: ({ column }) => {
      return <SortColumnButton column={column} label="Email" />;
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: 'emailVerified',
    header: 'Email Verified',
    enableHiding: true,
    enableSorting: true,
    cell: ({ getValue }) => (getValue() ? 'Yes' : 'No'),
  },
];
