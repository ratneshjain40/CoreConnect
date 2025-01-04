'use client';

import { ColumnDef } from '@tanstack/react-table';
import { SortColumnButton } from '@/components/custom/table';
import { SlugLink } from '@/components/custom/table/slug-link';
import { ActionsCell } from '@/components/custom/table/cell-actions';

type AdminApprovalsColumns = {
  blog: string;
  user: string;
  action: string;
};

export const AdminApprovalsColumns: ColumnDef<AdminApprovalsColumns>[] = [
  {
    accessorKey: 'blog',
    enableHiding: true,
    enableSorting: true,
    header: ({ column }) => <SortColumnButton column={column} label="Blog Name" />,
    cell: ({ row }) => <SlugLink route="approvals" value={row.getValue('blog')} slug={row.original.blog} />,
  },
  {
    accessorKey: 'user',
    enableHiding: true,
    enableSorting: true,
    header: ({ column }) => <SortColumnButton column={column} label="User Name" />,
    cell: ({ row }) => <SlugLink route="approvals" value={row.getValue('user')} slug={row.original.user} />,
  },
  {
    accessorKey: 'action',
    header: 'User Action',
    enableHiding: true,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <ActionsCell row={row} actions={['check', 'delete']} />,
  },
];
