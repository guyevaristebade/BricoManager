import { Loan } from '@prisma/client';
import { createLoanInput } from './dtos/create-loan.dto';
import prisma from '@config/db';

export const loanRepository = {
    create: async (userId: string, createLoanData: createLoanInput): Promise<Loan> => {
        return await prisma.loan.create({
            data: {
                user: { connect: { id: userId } },
                borrower: { connect: { id: createLoanData.borrowerId } },
                loanItems: {
                    create: createLoanData.loanCartItems.map((item) => ({ tool: { connect: { id: item.toolId } } })),
                },
            },
            include: { loanItems: { include: { tool: true } } },
        });
    },
};
