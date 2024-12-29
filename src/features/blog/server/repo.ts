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

// type BlogSlug = Pick<Blog, 'slug'>;
// async function getAllBlogSlugs(): Promise<BlogSlug[]> {
//   return await prisma.blog.findMany({
//     select: {
//       slug: true,
//     },
//   });
// }

export const blogRepo = {
  getAllBlogs,
  getBlogBySlug,
  getAllBlogSlugs,
};
