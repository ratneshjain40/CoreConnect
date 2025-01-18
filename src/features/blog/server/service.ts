import 'server-only';

import { z } from 'zod';
import { ErrorResponse } from '@/types/errors';
import { Blog, BlogComment } from '@prisma/client';
import { userService } from '@/features/users/server/service';
import { blogRepo, BlogsWithoutContent, CommentsWithAuthor } from './repo';
import { BlogFormType, createCommentSchema, UpdateBlogType } from '../schema/blog';

// returns all blogs without content field
async function getBlogsWithoutContent(): Promise<BlogsWithoutContent[]> {
  return blogRepo.getBlogsWithoutContent();
}

// returns all blogs without content field created by the user
async function getBlogsByUserWithoutContent(userId: string): Promise<BlogsWithoutContent[]> {
  return blogRepo.getBlogsByUserWithoutContent(userId);
}

// returns a single blog object based on slug
async function getBlogBySlug(slug: string): Promise<Blog | null> {
  let blog = await blogRepo.getBlogBySlug(slug);
  if (!blog) throw new ErrorResponse('Blog not found');

  return blog;
}

// user can create a blog
async function createBlog(userId: string, data: BlogFormType): Promise<Blog> {
  let user = await userService.getUserById(userId);
  return await blogRepo.createBlog({
    ...data,
    userId,
    author: user.name,
  });
}

// user can update only their own blog
async function updateBlog(userId: string, data: UpdateBlogType): Promise<Blog> {
  let blog = await blogRepo.getBlogById(data.id);
  if (!blog) throw new ErrorResponse('Blog not found');
  if (blog.userId !== userId) throw new ErrorResponse('You are not authorized to update this blog');

  return blogRepo.updateBlog(data.id, {
    title: data.title,
    slug: data.slug,
    coverImage: data.coverImage,
    categories: data.categories,
    isPaid: data.isPaid,
    content: data.content,
  });
}

// user can delete only their own blog
async function deleteBlog(userId: string, slug: string): Promise<Blog> {
  let blog = await blogRepo.getBlogWithoutContentBySlug(slug);
  if (!blog) throw new ErrorResponse('Blog not found');
  if (blog.userId !== userId) throw new ErrorResponse('You are not authorized to delete this blog');

  return blogRepo.deleteBlog(blog.id);
}

// admin can delete any blog
async function deleteBlogAdmin(slug: string): Promise<Blog> {
  let blog = await blogRepo.getBlogWithoutContentBySlug(slug);
  if (!blog) throw new ErrorResponse('Blog not found');

  return blogRepo.deleteBlog(blog.id);
}

/* -------------------------- Comments -------------------------- */

// returns all comments for a blog
async function getAllBlogComments(blogSlug: string): Promise<CommentsWithAuthor[]> {
  let blog = await blogRepo.getBlogWithoutContentBySlug(blogSlug);
  if (!blog) throw new ErrorResponse('Blog not found');

  return blogRepo.getAllBlogComments(blog.id);
}

// user can create a comment on a blog
async function createBlogComment(userId: string, data: z.infer<typeof createCommentSchema>): Promise<BlogComment> {
  let blog = await blogRepo.getBlogWithoutContentBySlug(data.blogSlug);
  if (!blog) throw new ErrorResponse('Blog not found');

  return await blogRepo.createBlogComment({
    content: data.content,
    blogId: blog.id,
    userId: userId,
  });
}

// user can delete only their own blog comment
async function deleteBlogComment(userId: string, blogCommentId: string): Promise<BlogComment> {
  let blogComment = await blogRepo.getBlogCommentById(blogCommentId);
  if (!blogComment) throw new ErrorResponse('Blog comment not found');
  if (blogComment.userId !== userId) throw new ErrorResponse('You are not authorized to delete this blog comment');

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
};
