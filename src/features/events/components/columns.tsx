'use client';

import { ColumnDef } from '@tanstack/react-table';
import { SortColumnButton } from '@/components/custom/table';
import { SlugLink } from '@/components/custom/table/slug-link';
import { SingleBadge } from '@/components/custom/table/cell-badge';
import { ActionsCell } from '@/components/custom/table/cell-actions';

export type AdminEventsColumns = {
  id: string;
  title: string;
  slug: string;
  location: string;
  date: string;
  price: string;
  status: 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
};

export const AdminEventsColumns: ColumnDef<AdminEventsColumns>[] = [
  {
    accessorKey: 'title',
    enableHiding: true,
    enableSorting: true,
    header: ({ column }) => <SortColumnButton column={column} label="Title" />,
    cell: ({ row }) => <SlugLink route="events" value={row.getValue('title')} slug={row.original.slug} />,
  },
  {
    accessorKey: 'location',
    enableHiding: true,
    enableSorting: true,
    header: ({ column }) => <SortColumnButton column={column} label="Location" />,
  },
  {
    accessorKey: 'date',
    enableHiding: true,
    enableSorting: true,
    header: ({ column }) => <SortColumnButton column={column} label="Date" />,
    cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
  },
  {
    accessorKey: 'status',
    enableHiding: true,
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      return <SingleBadge data={status} />;
    },
  },
  {
    accessorKey: 'price',
    enableHiding: true,
    enableSorting: true,
    header: ({ column }) => <SortColumnButton column={column} label="Price" />,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <ActionsCell route="events" row={row} actions={['edit', 'delete']} />,
  },
];
