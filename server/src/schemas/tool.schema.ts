import z from 'zod';

export const createToolSchema = z.object({
    toolName: z.string(),
    toolCategoryId: z.string(), //uuid() is depreciate
    toolStatus: z.enum(['AVAILABLE', 'LOANED', 'BROKEN', 'LOST']).default('AVAILABLE'),
    nbLoaning: z.number().default(0),
    toolPrice: z.number(),
    locationId: z.string(),
    toolDescription: z.string().max(500),
    link: z.string().url().optional(),
});

export type createToolInput = z.infer<typeof createToolSchema>;

export const updateSchema = z.object({
    toolName: z.string().optional(),
    toolCategoryId: z.string().optional(),
    toolStatus: z.enum(['AVAILABLE', 'LOANED', 'BROKEN', 'LOST']).optional(),
    nbLoaning: z.number().min(0).optional(),
    toolPrice: z.number().optional(),
    locationId: z.string().optional(),
    toolDescription: z.string().min(10).max(500).optional(),
});

export type updateToolInput = z.infer<typeof updateSchema>;
