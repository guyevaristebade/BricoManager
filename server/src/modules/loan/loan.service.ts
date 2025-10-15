import { loanRepository } from './loan.repository';
import { createLoanInput } from './dtos/create-loan.dto';
import { validateIds } from '@common/utils/validateIds';

export const loanService = {
    create: async (userId: string, createLoanData: createLoanInput) => {
        validateIds({ userId });
        // On vérifie que tous les outils existent et appartiennent à l'utilisateur

        // On vérifie leur disponibilité

        const loan = await loanRepository.create(userId, createLoanData);
        return loan;
    },
};
