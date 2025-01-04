import React from 'react';
import { EditBlog } from '@/features/blog/components';
import { getBlogBySlug } from '@/features/blog/server/actions';

const EditBlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const blog = await getBlogBySlug({ slug });
  
  return (
    <>
      <EditBlog data={blog?.data!!} />
    </>
  );
};

export default EditBlogPage;
