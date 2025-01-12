import React from 'react';
import Link from 'next/link';

import { Icon } from '@/constants/icons';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/custom/table';
import { columns } from '@/features/events/components';
import { getEvents } from '@/features/events/server/actions';

const AdminEventsPage = async () => {
  const result = await getEvents();
  const events = result?.data?.map((event) => ({
    ...event,
    createdAt: event.createdAt.toISOString(),
    updatedAt: event.updatedAt.toISOString(),
  }));

  return (
    <>
      <Link href="/admin/events/create">
        <Button aria-label="Create a new blog">
          <Icon name="add" className="mr-2 h-6 w-6 cursor-pointer text-white" aria-hidden="true" />
          Add an Event
        </Button>
      </Link>

      <DataTable columns={columns} data={events ?? []} showExportButton={false} filterField="title" />
    </>
  );
};

export default AdminEventsPage;
