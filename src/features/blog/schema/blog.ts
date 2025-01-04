import { z } from 'zod';

const blogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  coverImage: z.string(),
  categories: z.tuple([z.string()]).or(z.array(z.string())),
  isPaid: z.boolean(),
  content: z.string().min(1),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const updateBlogSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  coverImage: z.string(),
  categories: z.tuple([z.string()]).or(z.array(z.string())),
  isPaid: z.boolean(),
  content: z.string().min(1),
});

type BlogFormType = z.infer<typeof blogSchema>;
type UpdateBlogType = z.infer<typeof updateBlogSchema>;

export { blogSchema, updateBlogSchema };
export type { BlogFormType, UpdateBlogType };
