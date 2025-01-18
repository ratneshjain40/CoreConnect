import 'server-only';

import { prisma } from '@/db/prisma';
import { Blog, BlogComment, Prisma } from '@prisma/client';

// returns all blog slugs only (ISR)
async function getAllBlogSlugs(): Promise<string[]> {
  const slugs = await prisma.blog.findMany({
    select: {
      slug: true,
    },
  });

  return slugs.map((slug) => slug.slug);
}

// returns a single blog object based on slug
async function getBlogBySlug(slug: string): Promise<Blog | null> {
  return await prisma.blog.findUnique({
    where: {
      slug,
    },
  });
}

// returns a single blog object based on id
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

// returns a single blog object based on slug without content & coverImage field
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

// returns all blogs without content field created by the user
export type BlogsWithoutContent = Pick<
  Blog,
  'userId' | 'title' | 'slug' | 'categories' | 'isPaid' | 'author' | 'createdAt' | 'updatedAt' | 'coverImage'
>;
async function getBlogsWithoutContent(): Promise<BlogsWithoutContent[]> {
  return await prisma.blog.findMany({
    select: {
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

// returns all blogs without content field created by the user
async function getBlogsByUserWithoutContent(userId: string): Promise<BlogsWithoutContent[]> {
  return await prisma.blog.findMany({
    where: {
      userId,
    },
    select: {
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

// create blog operation
async function createBlog(data: Prisma.BlogCreateInput): Promise<Blog> {
  return await prisma.blog.create({
    data,
  });
}

// update blog operation
async function updateBlog(blogId: string, data: Prisma.BlogUpdateInput): Promise<Blog> {
  return await prisma.blog.update({
    where: { id: blogId },
    data: data,
  });
}

// delete blog operation
async function deleteBlog(blogId: string): Promise<Blog> {
  return await prisma.blog.delete({
    where: { id: blogId },
  });
}

/* -------------------------- Comments -------------------------- */

// returns a single blog comment object based on id
async function getBlogCommentById(blogCommentId: string): Promise<BlogComment | null> {
  return await prisma.blogComment.findUnique({
    where: {
      id: blogCommentId,
    },
  });
}

// returns all blog comments along with author name (query from another collection)
export type CommentsWithAuthor = { id: string; content: string; createdAt: Date; author: string; userId: string };
async function getAllBlogComments(blogId: string): Promise<CommentsWithAuthor[]> {
  const comments = await prisma.blogComment.findMany({
    where: {
      blogId,
    },
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

// create comment operation
async function createBlogComment(data: { content: string; blogId: string; userId: string }): Promise<BlogComment> {
  return await prisma.blogComment.create({
    data: {
      content: data.content,
      blogId: data.blogId,
      userId: data.userId,
    },
  });
}

// delete comment operation
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
