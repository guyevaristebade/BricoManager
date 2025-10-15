import z from 'zod';

export const borrowerSchema = z.object({
    firstName: z.string().min(3).max(50),
    lastName: z.string().min(3).max(50),
    address: z.string(),
    phone: z.string().min(10).max(13),
    email: z.email().refine((e) => !e.includes('yopmail.com'), 'Une donnée est invalide'),
});

export type borrowerInput = z.infer<typeof borrowerSchema>;
