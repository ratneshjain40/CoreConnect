import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { UserRole } from '@prisma/client'; // For roleGate metadata
import { blogService } from './service';
import { revalidatePath } from 'next/cache';
import { router, publicProcedure, privateProcedure } from '~/server/trpc/trpc';
import { blogSchema, updateBlogSchema, createCommentSchema } from '../schema/blog';

export const blogRouter = router({
  getBlogsWithoutContent: publicProcedure
    .query(async () => {
      try {
        return await blogService.getBlogsWithoutContent();
      } catch (error) {
        console.error("Error getting blogs without content:", error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch blogs.' });
      }
    }),

  getBlogsByUserWithoutContent: privateProcedure
    .meta({ roleGate: UserRole.USER })
    .query(async ({ ctx }) => {
      const sessionUser = ctx.session.user;
      try {
        return await blogService.getBlogsByUserWithoutContent(sessionUser.id);
      } catch (error) {
        console.error("Error getting user blogs:", error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch user blogs.' });
      }
    }),

  getBlogBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      try {
        const blog = await blogService.getBlogBySlug(input.slug);
        if (!blog) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Blog not found.' });
        }
        return blog;
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error("Error getting blog by slug:", error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch blog.' });
      }
    }),

  createBlog: privateProcedure
    .meta({ roleGate: UserRole.USER })
    .input(blogSchema)
    .mutation(async ({ ctx, input }) => {
      const sessionUser = ctx.session.user;
      try {
        await blogService.createBlog(sessionUser.id, sessionUser.name || "Unnamed User", input);
        revalidatePath('/user/blogs'); // Revalidate user's blog list
        revalidatePath('/blogs'); // Revalidate public blog list
        return { success: 'Blog created successfully' };
      } catch (error) {
        console.error("Error creating blog:", error);
        // Consider more specific error codes if blogService throws them (e.g., unique constraint violation)
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to create blog.' });
      }
    }),

  updateBlog: privateProcedure
    .meta({ roleGate: UserRole.USER })
    .input(updateBlogSchema)
    .mutation(async ({ ctx, input }) => {
      const sessionUser = ctx.session.user;
      try {
        const updatedBlog = await blogService.updateBlog(sessionUser.id, input);
        if (!updatedBlog) {
            throw new TRPCError({ code: 'NOT_FOUND', message: 'Blog not found or user not authorized to update.' });
        }
        revalidatePath(`/blogs/${updatedBlog.slug}`);
        revalidatePath('/user/blogs');
        return { success: 'Blog updated successfully' };
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error("Error updating blog:", error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to update blog.' });
      }
    }),

  deleteBlog: privateProcedure
    .meta({ roleGate: UserRole.USER })
    .input(z.object({ slug: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const sessionUser = ctx.session.user;
      try {
        await blogService.deleteBlog(sessionUser.id, input.slug);
        revalidatePath('/user/blogs');
        revalidatePath('/blogs');
        return { success: 'Blog deleted successfully' };
      } catch (error) {
        // Handle specific errors like "not found" or "not authorized" if blogService provides them
        console.error("Error deleting blog:", error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to delete blog.' });
      }
    }),

  deleteBlogAdmin: privateProcedure
    .meta({ roleGate: UserRole.ADMIN })
    .input(z.object({ slug: z.string() }))
    .mutation(async ({ input }) => {
      try {
        await blogService.deleteBlogAdmin(input.slug);
        revalidatePath('/admin/blogs');
        revalidatePath('/blogs');
        revalidatePath(`/blogs/${input.slug}`); // Also revalidate the specific blog page
        return { success: 'Blog deleted successfully by admin' };
      } catch (error) {
        console.error("Error deleting blog by admin:", error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to delete blog as admin.' });
      }
    }),

  // -------------------------- Comments --------------------------

  getAllBlogComments: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      try {
        return await blogService.getAllBlogComments(input.slug);
      } catch (error) {
        console.error("Error getting blog comments:", error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch comments.' });
      }
    }),

  createBlogComment: privateProcedure
    .meta({ roleGate: UserRole.USER })
    .input(createCommentSchema)
    .mutation(async ({ ctx, input }) => {
      const sessionUser = ctx.session.user;
      try {
        const comment = await blogService.createBlogComment(sessionUser.id, input);
        revalidatePath(`/blogs/${input.blogSlug}`); // Use blogSlug from input for revalidation
        return { success: 'Blog comment created successfully', comment };
      } catch (error) {
        console.error("Error creating blog comment:", error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to create comment.' });
      }
    }),

  deleteBlogComment: privateProcedure
    .meta({ roleGate: UserRole.USER })
    .input(z.object({ blogCommentId: z.string(), blogSlug: z.string() })) // Added blogSlug for revalidation
    .mutation(async ({ ctx, input }) => {
      const sessionUser = ctx.session.user;
      try {
        await blogService.deleteBlogComment(sessionUser.id, input.blogCommentId);
        revalidatePath(`/blogs/${input.blogSlug}`);
        return { success: 'Blog comment deleted successfully' };
      } catch (error) {
        console.error("Error deleting blog comment:", error);
        // Could be NOT_FOUND or FORBIDDEN if the user didn't own the comment
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to delete comment.' });
      }
    }),

  deleteBlogCommentAdmin: privateProcedure
    .meta({ roleGate: UserRole.ADMIN })
    .input(z.object({ blogCommentId: z.string(), blogSlug: z.string() })) // Added blogSlug for revalidation
    .mutation(async ({ input }) => {
      try {
        await blogService.deleteBlogCommentAdmin(input.blogCommentId);
        revalidatePath(`/blogs/${input.blogSlug}`);
        return { success: 'Blog comment deleted successfully by admin' };
      } catch (error) {
        console.error("Error deleting blog comment by admin:", error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to delete comment as admin.' });
      }
    }),
});

export type BlogRouter = typeof blogRouter;
