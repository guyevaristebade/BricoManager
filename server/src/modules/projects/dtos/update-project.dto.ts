import { ProjectStatus } from '@prisma/client';
import { z } from 'zod';

export const updateProjectSchema = z.object({
    projectName: z.string().min(2).max(100).optional(),
    projectStatus: z.enum(ProjectStatus).optional(),
    projectDescription: z.string().min(10).max(1000).optional(),
    projectStartDate: z
        .string()
        .date()
        .transform((d) => new Date(d))
        .optional(),
    projectEndDate: z
        .string()
        .date()
        .transform((d) => new Date(d))
        .optional(),
    projectBudget: z.coerce.number().min(0).optional(),
    projectProgress: z.coerce.number().min(0).max(100).optional(),
});

export type updateProjectInput = z.infer<typeof updateProjectSchema>;
