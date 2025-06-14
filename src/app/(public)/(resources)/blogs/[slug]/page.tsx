import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Loading } from '@/components/custom';
import { blogRepo } from '@/features/blog/server/repo';
import { SingleBlog } from '@/features/blog/components';
import { getBlogBySlug } from '@/features/blog/server/actions';

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await blogRepo.getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

const ViewBlogPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const blog = await getBlogBySlug({ slug });

  if (!blog?.data) {
    return notFound();
  }

  return (
    <div className="container gap-8 px-4 md:px-6">
      <Suspense fallback={<Loading />}>
        <SingleBlog data={blog?.data} />
      </Suspense>
    </div>
  );
};

export default ViewBlogPage;
