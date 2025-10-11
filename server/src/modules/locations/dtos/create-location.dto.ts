import z from 'zod';

export const createLocationSchema = z.object({
    locationName: z.string(),
});

export type createLocationInput = z.infer<typeof createLocationSchema>;
