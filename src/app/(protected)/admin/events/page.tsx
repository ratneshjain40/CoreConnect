import React from 'react';
import Link from 'next/link';

import { Icon } from '@/constants/icons';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/custom/table';
import { columns } from '@/features/admin/components/events';

const AdminEventsPage = async () => {
  return (
    <>
      <Link href="/admin/events/create">
        <Button aria-label="Create a new blog">
          <Icon name="add" className="mr-2 h-6 w-6 cursor-pointer text-white" aria-hidden="true" />
          Add an Event
        </Button>
      </Link>

      <DataTable columns={columns} data={[]} showExportButton={false} filterField="title" />
    </>
  );
};

export default AdminEventsPage;
