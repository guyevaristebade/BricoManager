import z from 'zod';

export const locationSchema = z.object({
    locationName: z.string().min(2).max(100),
});

export type locationInput = z.infer<typeof locationSchema>;
