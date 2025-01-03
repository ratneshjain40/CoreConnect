'use server';

import { authActionClient } from '@/lib/action-clients';
import { blogService } from './service';
import { z } from 'zod';
import { blogSchema, updateBlogSchema } from '../schema/blog';

const getAllBlogsData = authActionClient.metadata({
    roleGate: "USER",
}).action(async () => {
    return await blogService.getAllBlogsData();
});

const getAllBlogsDataByUser = authActionClient.metadata({
    roleGate: "USER",
}).action(async (data) => {
    let sessionUser = data.ctx.session.user;
    return await blogService.getAllBlogsDataByUser(sessionUser.id);
});

const getBlogBySlug = authActionClient.metadata({
    roleGate: "USER",
}).schema(z.object({
    slug: z.string(),
})).action(async (data) => {
    return await blogService.getBlogBySlug(data.parsedInput.slug);
});

const createBlog = authActionClient.metadata({
    roleGate: "USER",
}).schema(blogSchema).action(async (data) => {
    let sessionUser = data.ctx.session.user;
    return await blogService.createBlog(sessionUser.id, data.parsedInput);
});

const updateBlog = authActionClient.metadata({
    roleGate: "USER",
}).schema(updateBlogSchema).action(async (data) => {
    let sessionUser = data.ctx.session.user;
    return await blogService.updateBlog(sessionUser.id, data.parsedInput);
});

const deleteBlog = authActionClient.metadata({
    roleGate: "USER",
}).schema(z.object({
    blogId: z.string(),
})).action(async (data) => {
    let sessionUser = data.ctx.session.user;
    return await blogService.deleteBlog(sessionUser.id, data.parsedInput.blogId);
});

const deleteBlogAdmin = authActionClient.metadata({
    roleGate: "ADMIN",
}).schema(z.object({
    blogId: z.string(),
})).action(async (data) => {
    return await blogService.deleteBlogAdmin(data.parsedInput.blogId);
});

export const blogActions = {
    getAllBlogsData,
    getAllBlogsDataByUser,
    getBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog,
    deleteBlogAdmin,
};