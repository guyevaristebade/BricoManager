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
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
    name: z.string(),
    password: z
        .string()
        .min(6)
        .regex(/^(?=.*[A-Z])(?=.*\d).+$/, 'Password must contain at least one uppercase letter and one digit'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
