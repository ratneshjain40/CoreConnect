import { CardGridLoading } from '@/components/custom/loading';
import { BlogListLayout } from '@/features/blog/components/BlogListLayout';
import { getBlogsWithoutContent } from '@/features/blog/server/actions';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Blogs',
  description:
    'Explore the latest articles, insights, and research on invertebrate zoology and entomology from Entomon Institute experts.',
  keywords: ['Entomon Blogs', 'Entomology Articles', 'Invertebrate Research', 'Insect Studies', 'Entomon Publications'],
  alternates: {
    canonical: '/blogs',
  },
  openGraph: {
    title: 'Entomon Institute Blogs',
    description: 'Latest articles and research on invertebrate zoology and entomology from Entomon Institute experts.',
    url: '/blogs',
    type: 'website',
    images: [
      {
        url: '/images/entomon-logo.webp',
        alt: 'Entomon Institute Blogs',
      },
    ],
  },
};

export const revalidate = 3600;

const BlogsContent = async () => {
  const blogs = await getBlogsWithoutContent();
  return <BlogListLayout data={blogs?.data ?? []} />;
};

const BlogsPage = () => {
  return (
    <section className="w-full py-10">
      <div className="container gap-8 px-4 md:px-6">
        <Suspense fallback={<CardGridLoading />}>
          <BlogsContent />
        </Suspense>
      </div>
    </section>
  );
};

export default BlogsPage;
