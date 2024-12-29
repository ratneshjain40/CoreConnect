'use client';

import React, { startTransition, useState } from 'react';
import Link from 'next/link';

import { Icon } from '@/constants/icons';
import { ColumnDef } from '@tanstack/react-table';
import { SortColumnButton } from '@/components/custom/table';
import { CustomModal } from '@/components/custom/CustomModal';

type AdminCoursesColumns = {
  title: string;
  slug: string;
  price: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
};

const SlugLink = ({ value, slug }: { value: string; slug: string }) => (
  <Link target="_blank" href={`/courses/${encodeURIComponent(slug.toLowerCase())}`}>
    <div className="cursor-pointer hover:underline">{value}</div>
  </Link>
);

const CourseStatusBadge = ({ status }: { status: string }) => (
  <div className="flex flex-wrap gap-2">
    <span className="inline-block rounded-full bg-black px-2 py-1 text-xs font-semibold text-white">
      {status.trim()}
    </span>
  </div>
);

const ActionsCell = ({ row }: { row: any }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDelete = () => {
    setDialogOpen(false);
    startTransition(() => {});
  };

  return (
    <div className="flex items-center space-x-4">
      <Link href={`/admin/courses/edit/${encodeURIComponent(row.original.slug)}`}>
        <Icon name="edit" className="h-5 w-5 cursor-pointer" />
      </Link>

      <CustomModal
        open={isDialogOpen}
        onConfirm={handleDelete}
        onOpenChange={setDialogOpen}
        confirmButtonVariant="destructive"
        title="Confirm Deletion"
        confirmButtonLabel="Delete"
        cancelButtonLabel="Cancel"
        description="Are you sure you want to delete this course? This action cannot be undone!"
        trigger={
          <span onClick={() => setDialogOpen(true)}>
            <Icon name="delete" className="h-6 w-6 cursor-pointer text-red-500" />
          </span>
        }
      />
    </div>
  );
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
      return <CourseStatusBadge status={status} />;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ActionsCell,
  },
];
