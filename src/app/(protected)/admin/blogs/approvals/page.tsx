import React from 'react';
import { DataTable } from '@/components/custom/table';
import { columns } from '@/features/admin/components/approvals';

const BlogApprovalsPage = () => {
  return (
    <>
      <DataTable columns={columns} showExportButton={false} filterField="blog" data={[]} />
    </>
  );
};

export default BlogApprovalsPage;
