import 'server-only';

import { blogRepo } from './repo';
import { ErrorResponse } from '@/types/errors';
import { BlogFormType, UpdateBlogType } from '../schema/blog';
import { userService } from '@/features/users/server/service';

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
  let user = await userService.getUserById(userId);
  return await blogRepo.createBlog({
    ...data,
    userId,
    author: user.name,
  });
}

async function updateBlog(userId: string, data: UpdateBlogType) {
  let blog = await blogRepo.getBlogDataById(data.id);
  if (!blog) {
    throw new ErrorResponse('Blog not found');
  }
  if (blog.userId !== userId) {
    throw new ErrorResponse('You are not authorized to update this blog');
  }
  return blogRepo.updateBlog(data.id, {
    title: data.title,
    slug: data.slug,
    coverImage: data.coverImage,
    categories: data.categories,
    isPaid: data.isPaid,
    content: data.content,
  });
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
