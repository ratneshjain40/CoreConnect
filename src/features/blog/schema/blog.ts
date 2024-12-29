import { z } from 'zod';

const blogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  coverImage: z.string().nullable(),
  categories: z.tuple([z.string()]).or(z.array(z.string())),
  isPaid: z.boolean(),
  content: z.string().min(1),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

type BlogFormType = z.infer<typeof blogSchema>;

export { blogSchema };
export type { BlogFormType };
