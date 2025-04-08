'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Row } from '@tanstack/react-table';
import { exportTableToCSV } from '@/lib/export';
import { useAction } from 'next-safe-action/hooks';
import { MdSettingsSuggest } from 'react-icons/md';

import { Icon } from '@/constants/icons';
import { CustomModal } from '../CustomModal';
import { deleteBlogAdmin } from '@/features/blog/server/actions';
import { BlogTableColumnsType } from '@/features/blog/components/columns';
import { AdminCoursesColumns } from '@/features/courses/components/columns';
import { deleteEvent, getEventRegistrationsByEventId, updateEvent } from '@/features/events/server/actions';
import { EventTableColumnsType } from '@/features/events/components/columns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Types
type ActionType =
  | 'deleteBlog'
  | 'editBlog'
  | 'deleteEvent'
  | 'editEvent'
  | 'changeEventStatus'
  | 'downloadParticipants';
type RowType = Row<BlogTableColumnsType> | Row<AdminCoursesColumns> | Row<EventTableColumnsType>;

interface ActionComponentProps<T extends RowType> {
  row: T;
  onActionClick: (e: React.MouseEvent, callback: () => void) => void;
}

interface DeleteModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

// Reusable Components
const DeleteModal = ({ isOpen, onOpenChange, onConfirm }: DeleteModalProps) => (
  <CustomModal
    open={isOpen}
    onConfirm={onConfirm}
    onOpenChange={onOpenChange}
    confirmButtonVariant="destructive"
    title="Confirm Deletion"
    confirmButtonLabel="Delete"
    cancelButtonLabel="Cancel"
    description="Are you sure you want to delete this item? This action cannot be undone!"
  />
);

// Blog Actions
const BlogDeleteAction = ({ row, onActionClick }: ActionComponentProps<Row<BlogTableColumnsType>>) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { execute } = useAction(deleteBlogAdmin);

  const handleDelete = () => {
    setDialogOpen(false);
    execute({ slug: row.original.slug });
  };

  const openDialog = () => setDialogOpen(true);

  return (
    <>
      <div onClick={(e) => onActionClick(e, openDialog)} className="flex items-center gap-2">
        <Icon name="delete" className="h-4 w-4 text-red-500" />
        <span>Delete</span>
      </div>
      <DeleteModal isOpen={isDialogOpen} onOpenChange={setDialogOpen} onConfirm={handleDelete} />
    </>
  );
};

const BlogEditAction = ({ row }: ActionComponentProps<Row<BlogTableColumnsType>>) => {
  const session = useSession();
  const userRole = session.data?.user.role;

  const editPath = `/${userRole?.toLowerCase()}/blogs/edit/${encodeURIComponent(row.original.slug)}`;
  return (
    <Link href={editPath} className="flex items-center gap-2">
      <Icon name="edit" className="h-4 w-4" />
      <span>Edit</span>
    </Link>
  );
};

// Event Actions
const EventDeleteAction = ({ row, onActionClick }: ActionComponentProps<Row<EventTableColumnsType>>) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { execute } = useAction(deleteEvent);

  const handleDelete = () => {
    setDialogOpen(false);
    execute({ slug: row.original.slug });
  };

  const openDialog = () => setDialogOpen(true);

  return (
    <>
      <div onClick={(e) => onActionClick(e, openDialog)} className="flex items-center gap-2">
        <Icon name="delete" className="h-4 w-4 text-red-500" />
        <span>Delete</span>
      </div>
      <DeleteModal isOpen={isDialogOpen} onOpenChange={setDialogOpen} onConfirm={handleDelete} />
    </>
  );
};

const EventEditAction = ({ row }: ActionComponentProps<Row<EventTableColumnsType>>) => {
  const editPath = `/admin/events/edit/${encodeURIComponent(row.original.slug)}`;

  return (
    <Link href={editPath} className="flex items-center gap-2">
      <Icon name="edit" className="h-4 w-4" />
      <span>Edit</span>
    </Link>
  );
};

const EventStatusChangeAction = ({ row, onActionClick }: ActionComponentProps<Row<EventTableColumnsType>>) => {
  const router = useRouter();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { execute } = useAction(updateEvent);
  const { status, id } = row.original;

  const isActionable = status === 'UPCOMING' || status === 'PAUSED';
  const newStatus = status === 'UPCOMING' ? 'PAUSED' : 'UPCOMING';
  const statusLabel = status === 'UPCOMING' ? 'Pause' : 'Resume';

  const handleStatusChange = () => {
    if (isActionable) {
      setDialogOpen(false);
      execute({ id, status: newStatus });
      router.refresh();
    }
  };

  const renderStatusIcon = () => {
    if (status === 'UPCOMING') {
      return <Icon name="pause" className="h-4 w-4 text-yellow-500" />;
    } else if (status === 'PAUSED') {
      return <Icon name="unpause" className="h-4 w-4 text-blue-500" />;
    }
    return <Icon name="completed" className="h-4 w-4 text-green-500" />;
  };

  if (!isActionable) {
    return (
      <div className="flex items-center gap-2">
        <Icon name="completed" className="h-4 w-4 text-green-500" />
        <span>Completed</span>
      </div>
    );
  }

  const openDialog = () => setDialogOpen(true);

  return (
    <>
      <div onClick={(e) => onActionClick(e, openDialog)} className="flex items-center gap-2">
        {renderStatusIcon()}
        <span>{statusLabel}</span>
      </div>

      <CustomModal
        open={isDialogOpen}
        onConfirm={handleStatusChange}
        onOpenChange={setDialogOpen}
        confirmButtonVariant="default"
        title={`Mark as ${status === 'UPCOMING' ? 'Paused' : 'Upcoming'}?`}
        confirmButtonLabel="Sure"
        cancelButtonLabel="Cancel"
        description="Are you sure?"
      />
    </>
  );
};

const DownloadParticipants = ({ row }: ActionComponentProps<Row<EventTableColumnsType>>) => {
  const handleDownload = async () => {
    try {
      const csvString = await getEventRegistrationsByEventId({ slug: row.original.slug });

      if (!csvString?.data) {
        alert('No participants data available for this event.');
        return;
      }

      const blob = new Blob([csvString.data], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.setAttribute('download', 'participants.csv');

      // Append the link to the document, trigger the download, and then remove the link
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Error downloading participants:', error);
    }
  };

  return (
    <button onClick={handleDownload} className="flex items-center gap-2">
      <Icon name="download" className="h-4 w-4" />
      <span>Export</span>
    </button>
  );
};

// Action Component Mapping
const ACTION_COMPONENTS: Record<ActionType, React.ComponentType<any>> = {
  deleteBlog: BlogDeleteAction,
  editBlog: BlogEditAction,
  deleteEvent: EventDeleteAction,
  editEvent: EventEditAction,
  changeEventStatus: EventStatusChangeAction,
  downloadParticipants: DownloadParticipants,
};

interface ActionsCellProps {
  actions: ActionType[];
  row: RowType;
}

export const ActionsCell = ({ actions, row }: ActionsCellProps) => {
  const [open, setOpen] = useState(false);

  // This handler prevents event propagation and keeps the dropdown open
  // when an action requiring a modal is clicked
  const handleActionClick = (e: React.MouseEvent, callback: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    callback();
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="rounded-md p-1 hover:bg-accent focus:outline-none">
          <MdSettingsSuggest className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {actions.map((action) => {
          const ActionComponent = ACTION_COMPONENTS[action];
          if (!ActionComponent) return null;

          return (
            <DropdownMenuItem
              key={action}
              className="p-0"
              asChild
              onSelect={(e) => {
                // Prevent dropdown from closing for modal actions
                if (action === 'deleteBlog' || action === 'deleteEvent' || action === 'changeEventStatus') {
                  e.preventDefault();
                }
              }}
            >
              <div className="w-full cursor-pointer px-2 py-1.5">
                <ActionComponent row={row} onActionClick={handleActionClick} />
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
