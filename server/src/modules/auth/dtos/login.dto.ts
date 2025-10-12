import z from 'zod';

export const loginSchema = z.object({
    email: z.string().refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), 'format email invalide'),
    password: z.string(),
});

export type loginInput = z.infer<typeof loginSchema>;
