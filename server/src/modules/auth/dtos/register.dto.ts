import z from 'zod';

export const registerSchema = z.object({
    email: z
        .string()
        .email()
        .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), 'format email invalide')
        .refine((e) => !e.includes('yopmail.com'), 'Certain domaines ne sont pas autorisés'),
    name: z.string(),
    password: z
        .string()
        .min(6, 'Le mot de passe doit comporter au moins 6 caractères')
        .max(14, 'Le mot de passe doit comporter au plus 14 caractères')
        .regex(/^(?=.*[A-Z])(?=.*\d).+$/, 'Le mot de passe doit contenir au moins une lettre majuscule et un chiffre'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
