import z from 'zod';

export const locationSchema = z.object({
    locationName: z.string().optional(),
});

export type locationInput = z.infer<typeof locationSchema>;
