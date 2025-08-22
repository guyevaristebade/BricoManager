import z from 'zod';

export const locationSchema = z.object({
    locationName: z.string(),
});

export type locationInput = z.infer<typeof locationSchema>;
