import React from 'react';
import { notFound } from 'next/navigation';

import { currentUser } from '@/lib/auth';
import { DataTable } from '@/components/custom/table';
import { userColumns } from '@/features/events/components';
import { getEntireEventRegistrationByUserId } from '@/features/events/server/actions';

const UserEventsPage = async () => {
  const user = await currentUser();
  if (!user) return notFound();

  const events = await getEntireEventRegistrationByUserId({ userId: user.id });

  return (
    <>
      <DataTable columns={userColumns} data={events?.data ?? []} showExportButton={false} filterField="title" />
    </>
  );
};

export default UserEventsPage;
