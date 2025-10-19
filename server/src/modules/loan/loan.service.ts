import { loanRepository } from './loan.repository';
import { createLoanInput } from './dtos/create-loan.dto';
import { validateIds } from '@common/utils/validateIds';
import { toolRepository } from '@modules/tools';
import { HttpException } from '@common/errors/httpException';

export const loanService = {
    create: async (userId: string, createLoanData: createLoanInput) => {
        validateIds({ userId });

        // On vérifie que tous les outils existent et appartiennent à l'utilisateur
        const countTools = await toolRepository.checkToolsBelongUser(userId, createLoanData.loanItems);

        if (countTools == 0) {
            throw new HttpException('Bad request', 400, "Une erreur s'est produite");
        }

        const loan = await loanRepository.create(userId, createLoanData);
        return loan;
    },
};
