import z from 'zod';

export const toolSchema = z.object({
    toolName: z.string(),
    toolCategoryId: z.string(), //uuid() is depreciate
    toolStatus: z.enum(['AVAILABLE', 'LOANED', 'BROKEN', 'LOST']).default('AVAILABLE'),
    nbLoaning: z.number().min(0).default(0),
    toolPrice: z.number(),
    locationId: z.string(),
    toolDescription: z.string().min(10).max(500),
});

export type toolInput = z.infer<typeof toolSchema>;
