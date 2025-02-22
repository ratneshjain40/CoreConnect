'use client';

import { format } from 'date-fns';
import { ColumnDef } from '@tanstack/react-table';
import { SortColumnButton } from '@/components/custom/table';
import { SlugLink } from '@/components/custom/table/slug-link';
import { SingleBadge } from '@/components/custom/table/cell-badge';
import { ActionsCell } from '@/components/custom/table/cell-actions';

export type EventTableColumnsType = {
  id: string;
  title: string;
  location: string;
  slug: string;
  startDate: Date;
  endDate: Date;
  status: string;
  price: string;
};

export const EventTableColumns: ColumnDef<EventTableColumnsType>[] = [
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
    cell: ({ row }) => `₹${row.original.price}`,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <ActionsCell row={row} actions={['changeEventStatus', 'editEvent', 'deleteEvent']} />,
  },
];
