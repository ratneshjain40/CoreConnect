import React from 'react';
import { notFound, redirect } from 'next/navigation';

import { currentUser } from '@/lib/auth';
import { EditBlog } from '@/features/blog/components';
import { getBlogBySlug } from '@/features/blog/server/actions';

const EditBlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const blog = await getBlogBySlug({ slug });
  const user = await currentUser();

  if (!blog?.data) {
    return notFound();
  }

  if (blog && blog.data && user && blog.data.userId !== user.id) {
    return redirect(`/blogs/${slug}`);
  } else {
    return (
      <>
        <EditBlog data={blog?.data!!} />
      </>
    );
  }
};

export default EditBlogPage;
