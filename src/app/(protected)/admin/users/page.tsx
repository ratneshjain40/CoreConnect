import React from 'react';

import { DataTable } from '@/components/custom/table';
import { adminRepo } from '@/features/admin/server/repo';
import { columns } from '@/features/admin/components/users';

const AdminUsersPage = async () => {
  const data = await adminRepo.getAllUsersForAdminTable();
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
