import React from 'react';
import Link from 'next/link';

import { Icon } from '@/constants/icons';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/custom/table';
import { adminRepo } from '@/features/admin/server/repo';
import { columns } from '@/features/admin/components/blogs';

const AdminBlogsPage = async () => {
  const blogs = await adminRepo.getAllBlogsForAdminTable();

  return (
    <>
      <Link href="/admin/blogs/create">
        <Button aria-label="Create a new blog">
          <Icon name="add" className="mr-2 h-6 w-6 cursor-pointer text-white" aria-hidden="true" />
          Add a Blog
        </Button>
      </Link>

      <Link className="ml-5" href="/admin/blogs/approvals">
        <Button aria-label="Create a new blog">
          <Icon name="check" className="mr-2 h-6 w-6 cursor-pointer text-white" aria-hidden="true" />
          Check Approvals
        </Button>
      </Link>

      <DataTable columns={columns} showExportButton={false} filterField="title" data={blogs ?? []} />
    </>
  );
};

export default AdminBlogsPage;
