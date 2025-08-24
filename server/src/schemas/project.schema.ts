import { z } from 'zod';

export const createProjectSchema = z.object({
    projectName: z.string().min(2).max(100),
    projectStatus: z.enum(['PLANNED', 'IN_PROGRESS', 'COMPLETED']),
    projectDescription: z.string().min(10).max(1000),
    projectStartDate: z.date(),
    projectEndDate: z.date().optional(),
    projectBudget: z.number().min(0),
});

export type createProjectInput = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = z.object({
    projectName: z.string().min(2).max(100).optional(),
    projectStatus: z.enum(['PLANNED', 'IN_PROGRESS', 'COMPLETED']).optional(),
    projectDescription: z.string().min(10).max(1000).optional(),
    projectStartDate: z.date().optional(),
    projectEndDate: z.date().optional(),
    projectBudget: z.number().min(0).optional(),
});

export type updateProjectInput = z.infer<typeof updateProjectSchema>;
