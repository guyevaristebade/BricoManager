import { ToolStatus } from '@prisma/client';
import z from 'zod';

export const createToolSchema = z.object({
    toolName: z.string().nonempty(),
    toolDescription: z.string().max(500).nonempty(),
    toolStatus: z.enum(ToolStatus).default('AVAILABLE'),
    toolCategoryId: z.string().nonempty(), //uuid() is depreciate
    nbLoaning: z.number().default(0),
    toolPrice: z.coerce.number().min(0),
    locationId: z.string().nonempty(),
    link: z.string().url().optional(),
});

export type createToolInput = z.infer<typeof createToolSchema>;

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
