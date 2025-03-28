'use client';

import { ColumnDef } from '@tanstack/react-table';
import { SortColumnButton } from '@/components/custom/table';
import { SlugLink } from '@/components/custom/table/slug-link';
import { ActionsCell } from '@/components/custom/table/cell-actions';
import { MultipleBadges } from '@/components/custom/table/cell-badge';

export type BlogTableColumnsType = {
  title: string;
  slug: string;
  categories: string[];
  isPaid: boolean;
  userId: string;
  author: string;
};

export const BlogTableColumns: ColumnDef<BlogTableColumnsType>[] = [
  {
    accessorKey: 'title',
    enableHiding: true,
    enableSorting: true,
    header: ({ column }) => <SortColumnButton column={column} label="Title" />,
    cell: ({ row }) => <SlugLink route="blogs" value={row.getValue('title')} slug={row.original.slug} />,
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
    accessorKey: 'author',
    header: ({ column }) => <SortColumnButton column={column} label="Author" />,
    enableHiding: true,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <ActionsCell row={row} actions={['editBlog', 'deleteBlog']} />,
  },
];
