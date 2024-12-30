import { useState } from 'react';
import Link from 'next/link';

import { Icon } from '@/constants/icons';
import { CustomModal } from '../CustomModal';

type ActionProps = {
  row: any;
};

const DeleteAction = ({ row }: ActionProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDelete = () => {
    console.log('Delete action triggered for', row.original.id);
    setDialogOpen(false);
    // Perform delete logic here
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

const EditAction = ({ row }: ActionProps) => (
  <Link href={`/admin/blogs/edit/${encodeURIComponent(row.original.id)}`}>
    <Icon name="edit" className="h-5 w-5 cursor-pointer" />
  </Link>
);

const CheckAction = ({ row }: ActionProps) => (
  <span onClick={() => console.log('Check action triggered for', row.original.id)}>
    <Icon name="check" className="h-5 w-5 cursor-pointer" />
  </span>
);

const ACTION_COMPONENTS = {
  delete: DeleteAction,
  edit: EditAction,
  check: CheckAction,
};

type ActionsCellProps = {
  actions: ('delete' | 'edit' | 'check')[];
  row: any;
};

export const ActionsCell = ({ actions, row }: ActionsCellProps) => {
  return (
    <div className="flex items-center space-x-4">
      {actions.map((action) => {
        const ActionComponent = ACTION_COMPONENTS[action];
        return <ActionComponent key={action} row={row} />;
      })}
    </div>
  );
};
