import React from 'react';
import { getBlogsWithoutContent } from '@/features/blog/server/actions';
import { BlogListLayout } from '@/features/blog/components/BlogListLayout';

const BlogsPage = async () => {
  const blogs = await getBlogsWithoutContent();

  return (
    <section className="w-full py-10">
      <div className="container gap-8 px-4 md:px-6">
        <BlogListLayout data={blogs?.data ?? []} />
      </div>
    </section>
  );
};

export default BlogsPage;
