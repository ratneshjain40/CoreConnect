import React from 'react';
import Link from 'next/link';

import { Icon } from '@/constants/icons';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/custom/table';
import { columns } from '@/features/blog/components';
import { getAllBlogsDataByUser } from '@/features/blog/server/actions';

const UserBlogsPage = async () => {
  const blogs = await getAllBlogsDataByUser();

  return (
    <>
      <Link href="/user/blogs/create">
        <Button aria-label="Create a new blog">
          <Icon name="add" className="mr-2 h-6 w-6 cursor-pointer text-white" aria-hidden="true" />
          Add a Blog
        </Button>
      </Link>

      <DataTable columns={columns} showExportButton={false} filterField="title" data={blogs?.data ?? []} />
    </>
  );
};

export default UserBlogsPage;
