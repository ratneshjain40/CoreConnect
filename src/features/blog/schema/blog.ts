import { z } from 'zod';

const blogSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  coverImage: z.string().min(1, { message: 'Cover image is required.' }),
  categories: z.array(z.string().min(1, { message: 'Category must not be empty.' })),
  isPaid: z.boolean(),
  content: z.string().min(10, { message: 'Content is required.' }),
});

const updateBlogSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1, { message: 'Title is required.' }).optional(),
  coverImage: z.string().min(1, { message: 'Cover image is required.' }).optional(),
  categories: z.array(z.string().min(1, { message: 'Category must not be empty.' })).optional(),
  isPaid: z.boolean().optional(),
  content: z.string().min(10, { message: 'Content is required.' }),
});

const createCommentSchema = z.object({
  content: z.string().min(1, { message: 'Comment is required.' }),
  blogSlug: z.string().min(1, { message: 'Blog slug is required.' }),
});

type BlogFormType = z.infer<typeof blogSchema>;
type UpdateBlogType = z.infer<typeof updateBlogSchema>;

export { blogSchema, updateBlogSchema, createCommentSchema };
export type { BlogFormType, UpdateBlogType };
