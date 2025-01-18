'use server';

import { z } from 'zod';
import { blogService } from './service';
import { revalidatePath } from 'next/cache';
import { actionClient, authActionClient } from '@/lib/action-clients';
import { blogSchema, updateBlogSchema, createCommentSchema } from '../schema/blog';

// returns all blogs without content field
export const getBlogsWithoutContent = actionClient.action(async () => {
  return await blogService.getBlogsWithoutContent();
});

// returns all blogs without content field created by the user
export const getBlogsByUserWithoutContent = authActionClient
  .metadata({
    roleGate: 'USER',
  })
  .action(async (data) => {
    let sessionUser = data.ctx.session.user;
    return await blogService.getBlogsByUserWithoutContent(sessionUser.id);
  });

// returns a single blog object based on slug
export const getBlogBySlug = actionClient
  .schema(
    z.object({
      slug: z.string(),
    })
  )
  .action(async (data) => {
    return await blogService.getBlogBySlug(data.parsedInput.slug);
  });

// user can create a blog
export const createBlog = authActionClient
  .metadata({
    roleGate: 'USER',
  })
  .schema(blogSchema)
  .action(async (data) => {
    let sessionUser = data.ctx.session.user;
    await blogService.createBlog(sessionUser.id, data.parsedInput);
    return { success: 'Blog created successfully' };
  });

// user can update only their own blog
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

// user can delete only their own blog
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

// admin can delete any blog
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

// returns all comments for a blog
export const getAllBlogComments = actionClient
  .schema(
    z.object({
      slug: z.string(),
    })
  )
  .action(async (data) => {
    return await blogService.getAllBlogComments(data.parsedInput.slug);
  });

// user can create a comment on a blog
export const createBlogComment = authActionClient
  .metadata({
    roleGate: 'USER',
  })
  .schema(createCommentSchema)
  .action(async (data) => {
    let sessionUser = data.ctx.session.user;
    await blogService.createBlogComment(sessionUser.id, data.parsedInput);
    revalidatePath('/blogs/[slug]');
    return { success: 'Blog comment created successfully' };
  });

// user can delete only their own blog comment
export const deleteBlogComment = authActionClient
  .metadata({
    roleGate: 'USER',
  })
  .schema(
    z.object({
      blogCommentId: z.string(),
    })
  )
  .action(async (data) => {
    let sessionUser = data.ctx.session.user;
    await blogService.deleteBlogComment(sessionUser.id, data.parsedInput.blogCommentId);
    revalidatePath('/blogs/[slug]');
    return { success: 'Blog comment deleted successfully' };
  });
