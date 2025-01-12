import { z } from 'zod';

const blogSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  slug: z.string().min(1, { message: 'Slug is required.' }),
  coverImage: z.string().min(1, { message: 'Cover image is required.' }),
  categories: z.array(z.string().min(1, { message: 'Category must not be empty.' })),
  isPaid: z.boolean(),
  content: z.string().min(10, { message: 'Content is required.' }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const updateBlogSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1, { message: 'Slug is required.' }),
  title: z.string().min(1, { message: 'Title is required.' }),
  coverImage: z.string().min(1, { message: 'Cover image is required.' }),
  categories: z.array(z.string().min(1, { message: 'Category must not be empty.' })),
  isPaid: z.boolean(),
  content: z.string().min(1),
});

const createCommentSchema = z.object({
  content: z.string().min(1, { message: 'Comment is required.' }),
  blogSlug: z.string().min(1, { message: 'Blog slug is required.' }),
});

type BlogFormType = z.infer<typeof blogSchema>;
type UpdateBlogType = z.infer<typeof updateBlogSchema>;

export { blogSchema, updateBlogSchema, createCommentSchema };
export type { BlogFormType, UpdateBlogType };
