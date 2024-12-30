'use client';

import { ColumnDef } from '@tanstack/react-table';
import { SortColumnButton } from '@/components/custom/table';
import { SlugLink } from '@/components/custom/table/slug-link';
import { ActionsCell } from '@/components/custom/table/cell-actions';
import { MultipleBadges } from '@/components/custom/table/cell-badge';

type AdminBlogsColumns = {
  title: string;
  slug: string;
  categories: string[];
  isPaid: boolean;
};

export const AdminBlogsColumns: ColumnDef<AdminBlogsColumns>[] = [
  {
    accessorKey: 'title',
    enableHiding: true,
    enableSorting: true,
    header: ({ column }) => <SortColumnButton column={column} label="Title" />,
    cell: ({ row }) => <SlugLink value={row.getValue('title')} slug={row.original.slug} />,
  },
  {
    accessorKey: 'slug',
    enableHiding: true,
    enableSorting: true,
    header: ({ column }) => <SortColumnButton column={column} label="Slug" />,
    cell: ({ row }) => <SlugLink value={row.getValue('slug')} slug={row.original.slug} />,
  },
  {
    accessorKey: 'categories',
    enableHiding: true,
    header: 'Category',
    cell: ({ row }) => {
      const categories = row.original.categories;
      return <MultipleBadges data={categories} />;
    },
  },
  {
    accessorKey: 'isPaid',
    header: 'Is Paid',
    enableHiding: true,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <ActionsCell row={row} actions={['edit', 'delete']} />,
  },
];
