import 'server-only';

import { z } from 'zod';
import { ErrorResponse } from '@/types/errors';
import { generateSlug } from '@/lib/slugify';
import { BlogDataType } from '../types/blog';
import { Blog, BlogComment } from '@prisma/client';
import { blogRepo, CommentsWithAuthor } from './repo';
import { BlogFormType, createCommentSchema, UpdateBlogType } from '../schema/blog';

async function getBlogsWithoutContent(page: number, limit: number): Promise<BlogDataType[]> {
  return blogRepo.getBlogsWithoutContent(page, limit);
}

async function getBlogsByUserWithoutContent(userId: string, page: number, limit: number): Promise<BlogDataType[]> {
  return blogRepo.getBlogsByUserWithoutContent(userId, page, limit);
}

async function getBlogBySlug(slug: string): Promise<Blog | null> {
  let blog = await blogRepo.getBlogBySlug(slug);
  if (!blog) throw new ErrorResponse('Blog not found');

  return blog;
}

async function createBlog(userId: string, username: string, data: BlogFormType): Promise<Blog> {
  let slug = generateSlug(data.title);
  return await blogRepo.createBlog({
    ...data,
    slug,
    userId,
    author: username,
  });
}

async function updateBlog(userId: string, data: UpdateBlogType): Promise<Blog> {
  let blog = await blogRepo.getBlogByIdWithoutContent(data.id);
  if (!blog) throw new ErrorResponse('Blog not found');
  if (blog.userId !== userId) throw new ErrorResponse('You are not authorized to update this blog');

  let slug = data.title ? generateSlug(data.title) : blog.slug;
  return blogRepo.updateBlog(data.id, {
    title: data.title,
    slug: slug,
    coverImage: data.coverImage,
    categories: data.categories,
    isPaid: data.isPaid,
    content: data.content,
  });
}

async function deleteBlog(userId: string, slug: string): Promise<Blog> {
  let blog = await blogRepo.getBlogWithoutContentBySlug(slug);
  if (!blog) throw new ErrorResponse('Blog not found');
  if (blog.userId !== userId) throw new ErrorResponse('You are not authorized to delete this blog');

  return blogRepo.deleteBlog(blog.id);
}

async function deleteBlogAdmin(slug: string): Promise<Blog> {
  let blog = await blogRepo.getBlogWithoutContentBySlug(slug);
  if (!blog) throw new ErrorResponse('Blog not found');

  return blogRepo.deleteBlog(blog.id);
}

/* -------------------------- Comments -------------------------- */

async function getAllBlogComments(blogSlug: string, page: number, limit: number): Promise<CommentsWithAuthor[]> {
  let blog = await blogRepo.getBlogWithoutContentBySlug(blogSlug);
  if (!blog) throw new ErrorResponse('Blog not found');

  return blogRepo.getAllBlogComments(blog.id, page, limit);
}

async function createBlogComment(userId: string, data: z.infer<typeof createCommentSchema>): Promise<BlogComment> {
  let blog = await blogRepo.getBlogWithoutContentBySlug(data.blogSlug);
  if (!blog) throw new ErrorResponse('Blog not found');

  return await blogRepo.createBlogComment({
    content: data.content,
    blogId: blog.id,
    userId: userId,
  });
}

async function deleteBlogComment(userId: string, blogCommentId: string): Promise<BlogComment> {
  let blogComment = await blogRepo.getBlogCommentById(blogCommentId);
  if (!blogComment) throw new ErrorResponse('Blog comment not found');
  if (blogComment.userId !== userId) throw new ErrorResponse('You are not authorized to delete this blog comment');

  return blogRepo.deleteBlogComment(blogCommentId);
}

async function deleteBlogCommentAdmin(blogCommentId: string): Promise<BlogComment> {
  let blogComment = await blogRepo.getBlogCommentById(blogCommentId);
  if (!blogComment) throw new ErrorResponse('Blog comment not found');

  return blogRepo.deleteBlogComment(blogCommentId);
}

export const blogService = {
  getBlogBySlug,
  getBlogsWithoutContent,
  getBlogsByUserWithoutContent,
  createBlog,
  updateBlog,
  deleteBlog,
  deleteBlogAdmin,
  getAllBlogComments,
  createBlogComment,
  deleteBlogComment,
  deleteBlogCommentAdmin,
};
