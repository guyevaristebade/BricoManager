import z from 'zod';

export const updateBorrowerSchema = z.object({
    firstName: z.string().min(3).max(50).optional(),
    lastName: z.string().min(3).max(50).optional(),
    address: z.string().optional(),
    phone: z.string().min(10).max(13).optional(),
    email: z
        .email()
        // .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), 'format email invalide')
        .refine((e) => e.includes('yopmail.com'), 'Une donnée est invalide')
        .optional(),
});

export type updateBorrowerInput = z.infer<typeof updateBorrowerSchema>;
