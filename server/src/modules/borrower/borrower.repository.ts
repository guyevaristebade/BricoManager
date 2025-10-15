import { Borrower } from '@prisma/client';
import { borrowerInput } from './dtos/create-borrower.dto';
import { updateBorrowerInput } from './dtos/update-borrower.dto';
import prisma from '@config/db';
import { IBorrowerFilters } from './borrower.interface';

export const borrowerRepository = {
    create: async (userId: string, borrowerData: borrowerInput): Promise<Borrower> => {
        return await prisma.borrower.create({
            data: { userId, ...borrowerData },
        });
    },

    update: async (userId: string, borrowerId: string, borrowerData: updateBorrowerInput): Promise<Borrower> => {
        return await prisma.borrower.update({
            where: { userId, id: borrowerId },
            data: borrowerData,
        });
    },

    findById: async (userId: string, borrowerId: string): Promise<Borrower | null> => {
        return await prisma.borrower.findFirst({
            where: { id: borrowerId, userId },
        });
    },

    findAll: async (userId: string, filters?: IBorrowerFilters): Promise<Borrower[]> => {
        return await prisma.borrower.findMany({
            where: {
                userId,
                ...(filters?.search && {
                    firstName: { contains: filters.search, mode: 'insensitive' },
                    lastName: { contains: filters.search, mode: 'insensitive' },
                }),
            },
        });
    },

    delete: async (userId: string, borrowerId: string): Promise<Borrower> => {
        return await prisma.borrower.delete({
            where: { id: borrowerId, userId },
        });
    },

    findByEmail: async (userId: string, email: string): Promise<Borrower | null> => {
        return await prisma.borrower.findFirst({
            where: { email, userId },
        });
    },
};
