import React from 'react';

import { DataTable } from '@/components/custom/table';
import { columns } from '@/features/users/components';
import { userRepo } from '@/features/users/server/repo';

const AdminUsersPage = async () => {
  const data = await userRepo.selectAllUsers();
  const users = data.map((user) => ({
    ...user,
    emailVerified: !!user.emailVerified,
  }));

  return (
    <>
      <DataTable columns={columns} data={users} filterField="name" />
    </>
  );
};

export default AdminUsersPage;
