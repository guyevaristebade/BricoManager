import z from 'zod';

export const updateLocationSchema = z.object({
    locationName: z.string().optional(),
});

export type updateLocationInput = z.infer<typeof updateLocationSchema>;
