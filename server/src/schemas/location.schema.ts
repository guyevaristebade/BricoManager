import z from 'zod';

export const locationSchema = z.object({
    locationName: z.string(),
});

export type locationInput = z.infer<typeof locationSchema>;

export const updateLocationSchema = z.object({
    locationName: z.string().optional(),
});

export type updateLocationInput = z.infer<typeof updateLocationSchema>;
