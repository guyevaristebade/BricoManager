import { ToolStatus } from '@prisma/client';
import z from 'zod';

export const createToolSchema = z.object({
    toolName: z.string().nonempty(),
    toolDescription: z.string().max(500),
    toolStatus: z.enum(ToolStatus).default('AVAILABLE'),
    toolCategoryId: z.string(), //uuid() is depreciate
    nbLoaning: z.number().default(0),
    toolPrice: z.coerce.number().min(0),
    locationId: z.string(),
    link: z.string().url().optional(),
});

export type createToolInput = z.infer<typeof createToolSchema>;
