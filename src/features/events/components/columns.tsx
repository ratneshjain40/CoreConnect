'use client';

import { format } from 'date-fns';
import { EventDataType } from '../types/event';
import { ColumnDef } from '@tanstack/react-table';
import { SortColumnButton } from '@/components/custom/table';
import { SlugLink } from '@/components/custom/table/slug-link';
import { SingleBadge } from '@/components/custom/table/cell-badge';
import { ActionsCell } from '@/components/custom/table/cell-actions';

export const AdminEventsColumns: ColumnDef<EventDataType>[] = [
  {
    accessorKey: 'title',
    enableHiding: true,
    enableSorting: true,
    header: ({ column }) => <SortColumnButton column={column} label="Title" />,
    cell: ({ row }) => <SlugLink route="events" value={row.getValue('title')} slug={row.original.id} />,
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
    cell: ({ row }) => format(row.original.startDate, 'PPP'),
  },
  {
    accessorKey: 'endDate',
    enableHiding: true,
    enableSorting: true,
    header: ({ column }) => <SortColumnButton column={column} label="End Date" />,
    cell: ({ row }) => format(row.original.endDate, 'PPP'),
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
    cell: ({ row }) => <ActionsCell row={row} actions={['editEvent', 'deleteEvent']} />,
  },
];
