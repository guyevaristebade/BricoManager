import { successApiResponse } from '@common/utils/apiResponse';
import { loanService } from './loan.service';
import { NextFunction, Request, Response } from 'express';

export const loanController = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            const createLoanData = req.body;
            const newLoan = await loanService.create(userId, createLoanData);
            successApiResponse(res, { status: 201, message: 'Prêt créé avec succès', data: newLoan });
        } catch (error) {
            next(error);
        }
    },
};
