import React from 'react';
import { blogRepo } from '@/features/blog/server/repo';
import { BlogList } from '@/features/resources/components/blogs';

const BlogsPage = async () => {
  const blogs = await blogRepo.getAllBlogs();

  return (
    <>
      <h1>Blogs</h1>
      <BlogList blogs={blogs} />
    </>
  );
};

export default BlogsPage;
