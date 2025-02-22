import 'server-only';

import { prisma } from '@/db/prisma';
import { Blog, BlogComment, Prisma } from '@prisma/client';
import { BlogDataType } from '../types/blog';

async function getAllBlogSlugs(): Promise<string[]> {
  const slugs = await prisma.blog.findMany({
    select: {
      slug: true,
    },
  });

  return slugs.map((slug) => slug.slug);
}

async function getBlogBySlug(slug: string): Promise<Blog | null> {
  return await prisma.blog.findUnique({
    where: {
      slug,
    },
  });
}

async function getBlogByIdWithoutContent(id: string) {
  return await prisma.blog.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      categories: true,
      isPaid: true,
      author: true,
      userId: true,
    },
  });
}

async function getBlogWithoutContentBySlug(slug: string) {
  return await prisma.blog.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      categories: true,
      isPaid: true,
      author: true,
      userId: true,
    },
  });
}

async function getBlogsWithoutContent(page: number, limit: number): Promise<BlogDataType[]> {
  const skip = (page - 1) * limit;
  return await prisma.blog.findMany({
    skip,
    take: limit,
    select: {
      id: true,
      userId: true,
      title: true,
      slug: true,
      coverImage: true,
      categories: true,
      isPaid: true,
      author: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function getBlogsByUserWithoutContent(userId: string, page: number, limit: number): Promise<BlogDataType[]> {
  const skip = (page - 1) * limit;
  return await prisma.blog.findMany({
    where: {
      userId,
    },
    skip,
    take: limit,
    select: {
      id: true,
      userId: true,
      title: true,
      slug: true,
      coverImage: true,
      categories: true,
      isPaid: true,
      author: true,
      createdAt: true,
      updatedAt: true,
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

/* -------------------------- Comments -------------------------- */

async function getBlogCommentById(blogCommentId: string): Promise<BlogComment | null> {
  return await prisma.blogComment.findUnique({
    where: {
      id: blogCommentId,
    },
  });
}

export type CommentsWithAuthor = { id: string; content: string; createdAt: Date; author: string; userId: string };
async function getAllBlogComments(blogId: string, page: number, limit: number): Promise<CommentsWithAuthor[]> {
  const skip = (page - 1) * limit;
  const comments = await prisma.blogComment.findMany({
    where: {
      blogId,
    },
    skip,
    take: limit,
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return comments.map((comment) => ({
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    author: comment.author.name,
    userId: comment.userId,
  }));
}

async function createBlogComment(data: { content: string; blogId: string; userId: string }): Promise<BlogComment> {
  return await prisma.blogComment.create({
    data: {
      content: data.content,
      blogId: data.blogId,
      userId: data.userId,
    },
  });
}

async function deleteBlogComment(blogCommentId: string): Promise<BlogComment> {
  return await prisma.blogComment.delete({
    where: { id: blogCommentId },
  });
}

export const blogRepo = {
  getBlogByIdWithoutContent,
  getBlogBySlug,
  getAllBlogSlugs,
  getBlogsWithoutContent,
  getBlogWithoutContentBySlug,
  getBlogsByUserWithoutContent,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogCommentById,
  getAllBlogComments,
  createBlogComment,
  deleteBlogComment,
};
