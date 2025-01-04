import 'server-only';

import { ErrorResponse } from '@/types/errors';
import { BlogFormType, UpdateBlogType } from '../schema/blog';
import { blogRepo } from './repo';

async function getBlogBySlug(slug: string) {
  let blog = await blogRepo.getBlogBySlug(slug);
  if (!blog) {
    throw new ErrorResponse('Blog not found');
  }
  return blog;
}

async function getAllBlogsData() {
  return blogRepo.selectFromAllBlogs();
}

async function getAllBlogsDataByUser(userId: string) {
  return blogRepo.selectFromAllBlogsByUser(userId);
}

async function createBlog(userId: string, data: BlogFormType) {
  return await blogRepo.createBlog({
    ...data,
    userId,
  });
}

async function updateBlog(userId: string, data: UpdateBlogType) {
  let blog = await blogRepo.getBlogBySlug(data.slug);
  if (!blog) {
    throw new ErrorResponse('Blog not found');
  }
  if (blog.userId !== userId) {
    throw new ErrorResponse('You are not authorized to update this blog');
  }
  return blogRepo.updateBlog(blog.id, data);
}

async function deleteBlog(userId: string, slug: string) {
  let blog = await blogRepo.getBlogBySlug(slug);
  if (!blog) {
    throw new ErrorResponse('Blog not found');
  }
  if (blog.userId !== userId) {
    throw new ErrorResponse('You are not authorized to delete this blog');
  }
  return blogRepo.deleteBlog(blog.id);
}

async function deleteBlogAdmin(slug: string) {
    let blog = await blogRepo.getBlogBySlug(slug);
    if (!blog) {
      throw new ErrorResponse('Blog not found');
    }
  return blogRepo.deleteBlog(blog.id);
}

export const blogService = {
  getBlogBySlug,
  getAllBlogsData,
  getAllBlogsDataByUser,
  createBlog,
  updateBlog,
  deleteBlog,
  deleteBlogAdmin,
};
