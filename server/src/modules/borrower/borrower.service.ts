import { Borrower } from '@prisma/client';
import { borrowerRepository } from './borrower.repository';
import { updateBorrowerInput } from './dtos/update-borrower.dto';
import { borrowerInput } from './dtos/create-borrower.dto';
import { validateIds } from '@common/utils/validateIds';
import { IBorrowerFilters } from './borrower.interface';
import { HttpException } from '@common/errors/httpException';

export const borrowerService = {
    create: async (userId: string, borrowerData: borrowerInput): Promise<Borrower | null> => {
        validateIds({ userId });
        const existingBorrower = await borrowerRepository.findByEmail(userId, borrowerData.email);
        if (existingBorrower) throw new HttpException('Conflict', 409, 'Un emprunteur avec cet email existe déjà');

        return await borrowerRepository.create(userId, borrowerData);
    },

    update: async (userId: string, borrowerId: string, borrowerData: updateBorrowerInput): Promise<Borrower | null> => {
        validateIds({ userId, id: borrowerId });
        const existingBorrower = await borrowerRepository.findById(userId, borrowerId);
        if (!existingBorrower) throw new HttpException('Not Found', 404, "L'emprunteur n'existe pas");
        return await borrowerRepository.update(userId, borrowerId, borrowerData);
    },

    findById: async (userId: string, borrowerId: string): Promise<Borrower | null> => {
        validateIds({ userId, id: borrowerId });
        return await borrowerRepository.findById(userId, borrowerId);
    },

    findAll: async (userId: string, filters?: IBorrowerFilters): Promise<Borrower[]> => {
        validateIds({ userId });
        return await borrowerRepository.findAll(userId, filters);
    },

    delete: async (userId: string, borrowerId: string): Promise<Borrower | null> => {
        validateIds({ userId, id: borrowerId });
        return await borrowerRepository.delete(userId, borrowerId);
    },
};
