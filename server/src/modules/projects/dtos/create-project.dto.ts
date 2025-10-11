import { ProjectStatus } from '@prisma/client';
import { z } from 'zod';

export const createProjectSchema = z.object({
    projectName: z.string().min(2).max(100),
    projectStatus: z.enum(ProjectStatus).default('PLANNED'),
    projectDescription: z.string().min(10).max(1000),
    projectStartDate: z
        .string()
        .date()
        .transform((d) => new Date(d)),
    projectEndDate: z
        .string()
        .date()
        .transform((d) => new Date(d)) // conversion de la date reçu en entrée
        .optional(),
    projectBudget: z.coerce.number().min(0),
});

export type createProjectInput = z.infer<typeof createProjectSchema>;
