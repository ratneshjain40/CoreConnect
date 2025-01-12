import React from 'react';
import { BlogList } from '@/features/blog/components';
import { getAllBlogsData } from '@/features/blog/server/actions';

const BlogsPage = async () => {
  const blogs = await getAllBlogsData();

  return (
    <>
      <section className="w-full py-10">
        <div className="container gap-8 px-4 md:px-6">
          <h2 className="p-2 text-3xl font-bold tracking-tight">Blogs</h2>
          <BlogList blogs={blogs?.data || []} />
        </div>
      </section>
    </>
  );
};

export default BlogsPage;
