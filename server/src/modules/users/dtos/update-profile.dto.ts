import { z } from 'zod';

export const updateProfileSchema = z.object({
    darkMode: z.boolean().optional(),
});

export type updateProfileInput = z.infer<typeof updateProfileSchema>;
