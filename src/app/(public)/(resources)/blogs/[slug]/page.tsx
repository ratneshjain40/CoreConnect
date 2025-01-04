import React, { Suspense } from 'react';
import { Loading } from '@/components/custom';
import { blogRepo } from '@/features/blog/server/repo';
import { ViewBlog } from '@/features/blog/components';
import { getBlogBySlug } from '@/features/blog/server/actions';

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await blogRepo.getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

const ViewBlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const blog = await getBlogBySlug({ slug });

  if (!blog?.data) {
    // redirect to 404 page
    return;
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <ViewBlog data={blog?.data} />
      </Suspense>
    </>
  );
};

export default ViewBlogPage;
