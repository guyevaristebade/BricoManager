import { z } from 'zod';

export const createLoanSchema = z.object({
    borrowerId: z.string(),
    loanCartItems: z.array(
        z.object({
            toolId: z.string(),
        })
    ),
});

export type createLoanInput = z.infer<typeof createLoanSchema>;
