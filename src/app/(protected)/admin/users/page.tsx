import React from 'react';

import { DataTable } from '@/components/custom/table';
import { columns } from '@/features/users/components';
import { getAllUserData } from '@/features/users/server/action';

const AdminUsersPage = async () => {
  const users = await getAllUserData();
  const allUsers =
    users?.data?.map((user) => ({
      ...user,
      emailVerified: !!user.emailVerified,
    })) || [];

  return (
    <>
      <DataTable columns={columns} data={allUsers} filterField="name" />
    </>
  );
};

export default AdminUsersPage;
