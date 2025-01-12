'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { Icon } from '@/constants/icons';
import { Row } from '@tanstack/react-table';
import { CustomModal } from '../CustomModal';
import { useAction } from 'next-safe-action/hooks';
import { EventDataType } from '@/features/events/types/event';
import { deleteEvent } from '@/features/events/server/actions';
import { deleteBlogAdmin } from '@/features/blog/server/actions';
import { AdminBlogsColumns } from '@/features/blog/components/columns';
import { AdminCoursesColumns } from '@/features/courses/components/columns';

const BlogDeleteAction = ({ row }: { row: Row<AdminBlogsColumns> }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { execute } = useAction(deleteBlogAdmin);

  const handleDelete = () => {
    setDialogOpen(false);
    execute({ slug: row.original.slug });
  };

  return (
    <>
      <span onClick={() => setDialogOpen(true)}>
        <Icon name="delete" className="h-5 w-5 cursor-pointer text-red-500" />
      </span>
      <CustomModal
        open={isDialogOpen}
        onConfirm={handleDelete}
        onOpenChange={setDialogOpen}
        confirmButtonVariant="destructive"
        title="Confirm Deletion"
        confirmButtonLabel="Delete"
        cancelButtonLabel="Cancel"
        description="Are you sure you want to delete this item? This action cannot be undone!"
      />
    </>
  );
};

const EventDeleteAction = ({ row }: { row: Row<EventDataType> }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { execute } = useAction(deleteEvent);

  const handleDelete = () => {
    setDialogOpen(false);
    execute({ id: row.original.id });
  };

  return (
    <>
      <span onClick={() => setDialogOpen(true)}>
        <Icon name="delete" className="h-5 w-5 cursor-pointer text-red-500" />
      </span>
      <CustomModal
        open={isDialogOpen}
        onConfirm={handleDelete}
        onOpenChange={setDialogOpen}
        confirmButtonVariant="destructive"
        title="Confirm Deletion"
        confirmButtonLabel="Delete"
        cancelButtonLabel="Cancel"
        description="Are you sure you want to delete this item? This action cannot be undone!"
      />
    </>
  );
};

const BlogEditAction = ({ row }: { row: Row<AdminBlogsColumns> }) => {
  const session = useSession();
  if (row.original.userId === session.data?.user.id)
    return (
      <Link href={`/admin/blogs/edit/${encodeURIComponent(row.original.slug)}`}>
        <Icon name="edit" className="h-5 w-5 cursor-pointer" />
      </Link>
    );
  return null;
};

const EventEditAction = ({ row }: { row: Row<EventDataType> }) => {
  return (
    <Link href={`/admin/events/edit/${encodeURIComponent(row.original.id)}`}>
      <Icon name="edit" className="h-5 w-5 cursor-pointer" />
    </Link>
  );
};

const ACTION_COMPONENTS = {
  deleteBlog: BlogDeleteAction,
  editBlog: BlogEditAction,
  deleteEvent: EventDeleteAction,
  editEvent: EventEditAction,
};

type ActionsCellProps = {
  actions: ('deleteBlog' | 'editBlog' | 'deleteEvent' | 'editEvent')[];
  row: Row<AdminBlogsColumns> | Row<AdminCoursesColumns> | Row<EventDataType>;
};

export const ActionsCell = ({ actions, row }: ActionsCellProps) => {
  return (
    <div className="flex items-center space-x-4">
      {actions.map((action) => {
        const ActionComponent = ACTION_COMPONENTS[action];
        return <ActionComponent key={action} row={row as any} />;
      })}
    </div>
  );
};
