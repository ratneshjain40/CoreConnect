'use client';

import { ColumnDef } from '@tanstack/react-table';
import { SortColumnButton } from '@/components/custom/table';
import { SlugLink } from '@/components/custom/table/slug-link';
import { SingleBadge } from '@/components/custom/table/cell-badge';
import { ActionsCell } from '@/components/custom/table/cell-actions';

type AdminCoursesColumns = {
  title: string;
  slug: string;
  price: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
};

export const AdminCoursesColumns: ColumnDef<AdminCoursesColumns>[] = [
  {
    accessorKey: 'title',
    enableHiding: true,
    enableSorting: true,
    header: ({ column }) => <SortColumnButton column={column} label="Title" />,
    cell: ({ row }) => <SlugLink value={row.getValue('title')} slug={row.original.slug} />,
  },
  {
    accessorKey: 'price',
    enableHiding: true,
    enableSorting: true,
    header: ({ column }) => <SortColumnButton column={column} label="Price" />,
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
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <ActionsCell row={row} actions={['edit', 'delete']} />,
  },
];
