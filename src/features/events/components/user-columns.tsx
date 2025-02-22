'use client';

import { format } from 'date-fns';
import { ColumnDef } from '@tanstack/react-table';
import { EventTableColumnsType } from './columns';
import { SortColumnButton } from '@/components/custom/table';
import { SlugLink } from '@/components/custom/table/slug-link';

export const UserEventTableColumns: ColumnDef<EventTableColumnsType>[] = [
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
    accessorKey: 'startDate',
    enableHiding: true,
    enableSorting: true,
    header: ({ column }) => <SortColumnButton column={column} label="Start Date" />,
    cell: ({ row }) => format(row.original.startDate, 'dd MMM yyyy'),
  },
  {
    accessorKey: 'endDate',
    enableHiding: true,
    enableSorting: true,
    header: ({ column }) => <SortColumnButton column={column} label="End Date" />,
    cell: ({ row }) => format(row.original.endDate, 'dd MMM yyyy'),
  },
  {
    accessorKey: 'price',
    enableHiding: true,
    enableSorting: true,
    header: ({ column }) => <SortColumnButton column={column} label="Price" />,
    cell: ({ row }) => `₹${row.original.price}`,
  },
];
