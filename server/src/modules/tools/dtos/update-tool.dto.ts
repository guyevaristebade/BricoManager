import z from 'zod';
import { ToolStatus } from '@prisma/client';

export const updateToolSchema = z.object({
    toolName: z.string().optional(),
    toolCategoryId: z.string().optional(),
    toolStatus: z.enum(ToolStatus).optional(),
    toolPrice: z.coerce.number().optional(),
    locationId: z.string().optional(),
    toolDescription: z.string().min(10).max(500).optional(),
    link: z.string().url().optional(),
});

export type updateToolInput = z.infer<typeof updateToolSchema>;
