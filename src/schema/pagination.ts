import { z } from 'zod';

const paginationSchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
});

export type PaginationType = z.infer<typeof paginationSchema>;
export { paginationSchema };