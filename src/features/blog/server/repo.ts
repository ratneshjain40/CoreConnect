import 'server-only';
import { prisma } from '@/db/prisma';
import { Blog } from '@prisma/client';

async function getAllBlogs(): Promise<Blog[]> {
  return await prisma.blog.findMany();
}

async function getBlogBySlug(slug: string): Promise<Blog | null> {
  return await prisma.blog.findUnique({
    where: {
      slug,
    },
  });
}

async function getAllBlogSlugs(): Promise<string[]> {
  const slugs = await prisma.blog.findMany({
    select: {
      slug: true,
    },
  });

  return slugs.map((slug) => slug.slug);
}

type BlogSpecificFields = Pick<Blog, 'title' | 'slug' | 'categories' | 'isPaid'>;
async function getAllBlogsForAdminTable(): Promise<BlogSpecificFields[]> {
  return await prisma.blog.findMany({
    select: {
      title: true,
      slug: true,
      categories: true,
      isPaid: true,
    },
  });
}

export const blogRepo = {
  getAllBlogs,
  getBlogBySlug,
  getAllBlogSlugs,
  getAllBlogsForAdminTable,
};
