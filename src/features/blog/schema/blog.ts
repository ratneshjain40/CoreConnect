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

const commentSchema = z.object({
  author: z.string().min(1),
  image: z.string().min(1),
  content: z.string().min(1),
  date: z.date(),
});

type BlogFormType = z.infer<typeof blogSchema>;
type UpdateBlogType = z.infer<typeof updateBlogSchema>;

export { blogSchema, updateBlogSchema, commentSchema };
export type { BlogFormType, UpdateBlogType };
