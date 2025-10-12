import z from 'zod';

export const registerSchema = z.object({
    email: z
        .string()
        .email()
        .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), 'format email invalide')
        .refine((e) => !e.includes('yopmail.com'), 'email invalide'),
    name: z.string(),
    password: z
        .string()
        .min(6, 'Le mot de passe doit comporter au moins 6 caractères')
        .max(14, 'Le mot de passe doit comporter au plus 14 caractères')
        .regex(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
            'Le mot de passe doit contenir au moins une lettre majuscule, un chiffre et un caractère spécial'
        ),
});

export type RegisterInput = z.infer<typeof registerSchema>;
