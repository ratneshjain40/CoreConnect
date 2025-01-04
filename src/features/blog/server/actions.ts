'use server';

import { authActionClient } from '@/lib/action-clients';
import { blogService } from './service';
import { z } from 'zod';
import { blogSchema, updateBlogSchema } from '../schema/blog';

export const getAllBlogsData = authActionClient
  .metadata({
    roleGate: 'USER',
  })
  .action(async () => {
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

export const getBlogBySlug = authActionClient
  .metadata({
    roleGate: 'USER',
  })
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
    console.log('BLOG DATA', data);
    let sessionUser = data.ctx.session.user;
    await blogService.createBlog(sessionUser.id, data.parsedInput);
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
    return { success: 'Blog updated successfully' };
  });

export const deleteBlog = authActionClient
  .metadata({
    roleGate: 'USER',
  })
  .schema(
    z.object({
      blogId: z.string(),
    })
  )
  .action(async (data) => {
    let sessionUser = data.ctx.session.user;
    await blogService.deleteBlog(sessionUser.id, data.parsedInput.blogId);
    return { success: 'Blog deleted successfully' };
  });

export const deleteBlogAdmin = authActionClient
  .metadata({
    roleGate: 'ADMIN',
  })
  .schema(
    z.object({
      blogId: z.string(),
    })
  )
  .action(async (data) => {
    await blogService.deleteBlogAdmin(data.parsedInput.blogId);
    return { success: 'Blog deleted successfully' };
  });
