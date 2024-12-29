import React from 'react';
import { blogRepo } from '@/features/blog/server/repo';
import { CreateUpdateBlog } from '@/features/blog/components';

const EditBlog = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const blog = await blogRepo.getBlogBySlug(slug);

  return (
    <>
      <CreateUpdateBlog data={blog} />
    </>
  );
};

export default EditBlog;
