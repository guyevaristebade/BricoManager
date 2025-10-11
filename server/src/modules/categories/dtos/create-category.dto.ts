import z from 'zod';

export const categorySchema = z.object({
    categoryName: z.string(),
});

export type categoryInput = z.infer<typeof categorySchema>;
