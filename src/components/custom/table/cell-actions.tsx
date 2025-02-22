'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { Icon } from '@/constants/icons';
import { Row } from '@tanstack/react-table';
import { CustomModal } from '../CustomModal';
import { useAction } from 'next-safe-action/hooks';
import { deleteBlogAdmin } from '@/features/blog/server/actions';
import { BlogTableColumnsType } from '@/features/blog/components/columns';
import { AdminCoursesColumns } from '@/features/courses/components/columns';
import { deleteEvent, updateEvent } from '@/features/events/server/actions';
import { EventTableColumnsType } from '@/features/events/components/columns';
import { useRouter } from 'next/navigation';

const BlogDeleteAction = ({ row }: { row: Row<BlogTableColumnsType> }) => {
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

const EventDeleteAction = ({ row }: { row: Row<EventTableColumnsType> }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { execute } = useAction(deleteEvent);

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

const BlogEditAction = ({ row }: { row: Row<BlogTableColumnsType> }) => {
  const session = useSession();
  if (row.original.userId === session.data?.user.id)
    return (
      <Link href={`/${session.data.user.role.toLocaleLowerCase()}/blogs/edit/${encodeURIComponent(row.original.slug)}`}>
        <Icon name="edit" className="h-5 w-5 cursor-pointer" />
      </Link>
    );
  return null;
};

const EventEditAction = ({ row }: { row: Row<EventTableColumnsType> }) => {
  return (
    <Link href={`/admin/events/edit/${encodeURIComponent(row.original.slug)}`}>
      <Icon name="edit" className="h-5 w-5 cursor-pointer" />
    </Link>
  );
};

const EventStatusChangeAction = ({ row }: { row: Row<EventTableColumnsType> }) => {
  const router = useRouter();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { execute, hasSucceeded } = useAction(updateEvent);

  const handleStatusChange = () => {
    if (row.original.status === 'UPCOMING') {
      setDialogOpen(false);
      execute({ id: row.original.id, status: 'COMPLETED' });
      router.refresh();
    }
    return;
  };

  if (hasSucceeded) {
    console.log('Event status changed successfully');
  }

  return (
    <>
      <span
        onClick={() => {
          if (row.original.status === 'UPCOMING') setDialogOpen(true);
        }}
      >
        <Icon
          name="check"
          className={`h-5 w-5 cursor-pointer ${
            row.original.status === 'COMPLETED' ? 'cursor-not-allowed text-green-500' : 'text-yellow-500'
          }`}
        />
      </span>
      <CustomModal
        open={isDialogOpen}
        onConfirm={handleStatusChange}
        onOpenChange={setDialogOpen}
        confirmButtonVariant="default"
        title="Mark Completed?"
        confirmButtonLabel="Sure"
        cancelButtonLabel="Cancel"
        description="Are you sure you want to mark event as completed? This action cannot be undone!"
      />
    </>
  );
};

const ACTION_COMPONENTS = {
  deleteBlog: BlogDeleteAction,
  editBlog: BlogEditAction,
  deleteEvent: EventDeleteAction,
  editEvent: EventEditAction,
  changeEventStatus: EventStatusChangeAction,
};

type ActionsCellProps = {
  actions: ('deleteBlog' | 'editBlog' | 'deleteEvent' | 'editEvent' | 'changeEventStatus')[];
  row: Row<BlogTableColumnsType> | Row<AdminCoursesColumns> | Row<EventTableColumnsType>;
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
