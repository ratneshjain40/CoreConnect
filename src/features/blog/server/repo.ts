import 'server-only';
import { prisma } from '@/db/prisma';
import { Blog, Prisma } from '@prisma/client';
import { UpdateBlogType } from '../schema/blog';

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

type BlogSpecificFields = Pick<Blog, 'id' | 'title' | 'slug' | 'categories' | 'isPaid' | 'userId'>;
async function selectFromAllBlogs(): Promise<BlogSpecificFields[]> {
  return await prisma.blog.findMany({
    select: {
      id: true,
      title: true,
      userId: true,
      slug: true,
      categories: true,
      isPaid: true,
    },
  });
}

async function selectBlogById(blogId: string): Promise<BlogSpecificFields | null> {
  return await prisma.blog.findUnique({
    where: {
      id: blogId,
    },
    select: {
      id: true,
      title: true,
      userId: true,
      slug: true,
      categories: true,
      isPaid: true,
    },
  });
}

async function selectFromAllBlogsByUser(userId: string): Promise<BlogSpecificFields[]> {
  return await prisma.blog.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      title: true,
      userId: true,
      slug: true,
      categories: true,
      isPaid: true,
    },
  });
}

async function createBlog(data: Prisma.BlogCreateInput): Promise<Blog> {
  return await prisma.blog.create({
    data,
  });
}

async function updateBlog(blogId: string, data: Prisma.BlogUpdateInput): Promise<Blog> {
  return await prisma.blog.update({
    where: { id: blogId },
    data: data,
  });
}

async function deleteBlog(blogId: string): Promise<Blog> {
  return await prisma.blog.delete({
    where: { id: blogId },
  });
}

export const blogRepo = {
  getAllBlogs,
  getBlogBySlug,
  getAllBlogSlugs,
  selectFromAllBlogs,
  selectBlogById,
  selectFromAllBlogsByUser,
  createBlog,
  updateBlog,
  deleteBlog,
};
