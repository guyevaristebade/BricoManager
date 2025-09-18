import z from 'zod';

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export type loginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    email: z
        .string()
        .email()
        .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), 'Invalid email format')
        .refine((e) => !e.includes('yopmail.com'), 'Yopmail is not allowed'),
    name: z.string(),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .max(14, 'Password must be at most 14 characters long')
        .regex(/^(?=.*[A-Z])(?=.*\d).+$/, 'Password must contain at least one uppercase letter and one digit'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
