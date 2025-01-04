import React from 'react';
import { BlogList } from '@/features/blog/components';
import { getAllBlogsData } from '@/features/blog/server/actions';

const BlogsPage = async () => {
  const blogs = await getAllBlogsData();

  return (
    <>
      <h1>Blogs</h1>
      <BlogList blogs={blogs?.data || []} />
    </>
  );
};

export default BlogsPage;
