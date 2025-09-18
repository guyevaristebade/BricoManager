import { z } from 'zod';

export const editUserSchema = z.object({
    email: z.string().email().optional(),
    name: z.string().min(3).max(50).optional(),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .max(14, 'Password must be at most 14 characters long')
        .regex(/^(?=.*[A-Z])(?=.*\d).+$/, 'Password must contain at least one uppercase letter and one digit')
        .optional(),
});

export type editUserInput = z.infer<typeof editUserSchema>;
