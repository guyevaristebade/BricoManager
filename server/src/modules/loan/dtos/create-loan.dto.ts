import { z } from 'zod';

export const createLoanSchema = z.object({
    borrowerId: z.cuid(),
    loanItems: z.array(z.cuid()),
});

export type createLoanInput = z.infer<typeof createLoanSchema>;
