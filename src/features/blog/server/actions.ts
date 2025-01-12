'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { blogService } from './service';
import { blogSchema, createCommentSchema, updateBlogSchema } from '../schema/blog';
import { actionClient, authActionClient } from '@/lib/action-clients';

export const getAllBlogsData = actionClient.action(async () => {
  return await blogService.getAllBlogsData();
});

export const getAllBlogsDataByUser = authActionClient
  .metadata({
    roleGate: 'USER',
  })
  .action(async (data) => {
    let sessionUser = data.ctx.session.user;
    return await blogService.getAllBlogsDataByUser(sessionUser.id);
  });

export const getBlogBySlug = actionClient
  .schema(
    z.object({
      slug: z.string(),
    })
  )
  .action(async (data) => {
    return await blogService.getBlogBySlug(data.parsedInput.slug);
  });

export const createBlog = authActionClient
  .metadata({
    roleGate: 'USER',
  })
  .schema(blogSchema)
  .action(async (data) => {
    let sessionUser = data.ctx.session.user;
    await blogService.createBlog(sessionUser.id, data.parsedInput);
    revalidatePath('/admin/blogs');
    return { success: 'Blog created successfully' };
  });

export const updateBlog = authActionClient
  .metadata({
    roleGate: 'USER',
  })
  .schema(updateBlogSchema)
  .action(async (data) => {
    let sessionUser = data.ctx.session.user;
    await blogService.updateBlog(sessionUser.id, data.parsedInput);
    revalidatePath('/admin/blogs');
    return { success: 'Blog updated successfully' };
  });

export const deleteBlog = authActionClient
  .metadata({
    roleGate: 'USER',
  })
  .schema(
    z.object({
      slug: z.string(),
    })
  )
  .action(async (data) => {
    let sessionUser = data.ctx.session.user;
    await blogService.deleteBlog(sessionUser.id, data.parsedInput.slug);
    revalidatePath('/user/blogs');
    return { success: 'Blog deleted successfully' };
  });

export const deleteBlogAdmin = authActionClient
  .metadata({
    roleGate: 'ADMIN',
  })
  .schema(
    z.object({
      slug: z.string(),
    })
  )
  .action(async (data) => {
    await blogService.deleteBlogAdmin(data.parsedInput.slug);
    revalidatePath('/admin/blogs');
    return { success: 'Blog deleted successfully' };
  });

// -------------------------- Comments --------------------------
export const getAllBlogComments = actionClient
  .schema(
    z.object({
      slug: z.string(),
    })
  )
  .action(async (data) => {
    return await blogService.getAllBlogComments(data.parsedInput.slug);
  });

export const createBlogComment = authActionClient
  .metadata({
    roleGate: 'USER',
  })
  .schema(createCommentSchema)
  .action(async (data) => {
    let sessionUser = data.ctx.session.user;
    await blogService.createBlogComment(sessionUser.id, data.parsedInput);
    return { success: 'Blog comment created successfully' };
  });

export const deleteBlogComment = authActionClient
  .metadata({
    roleGate: 'USER'
  }).schema(
    z.object({
      blogCommentId: z.string(),
    })
  )
  .action(async (data) => {
    let sessionUser = data.ctx.session.user;
    await blogService.deleteBlogComment(sessionUser.id, data.parsedInput.blogCommentId);
    return { success: 'Blog comment deleted successfully' };
  });