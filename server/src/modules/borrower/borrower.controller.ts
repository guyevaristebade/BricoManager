import { successApiResponse } from '@common/utils/apiResponse';
import { Request, NextFunction, Response } from 'express';
import { borrowerService } from './borrower.service';

export const borrowerController = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            const borrowerData = req.body;
            const newBorrower = await borrowerService.create(userId, borrowerData);
            successApiResponse(res, { status: 201, message: 'Emprunteur créé avec succès', data: newBorrower });
        } catch (error) {
            next(error);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            const borrowerId = req.params.id;
            const borrowerData = req.body;
            const updatedBorrower = await borrowerService.update(userId, borrowerId, borrowerData);
            successApiResponse(res, {
                status: 200,
                message: 'Emprunteur mis à jour avec succès',
                data: updatedBorrower,
            });
        } catch (error) {
            next(error);
        }
    },

    findById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            const borrowerId = req.params.id;
            const borrower = await borrowerService.findById(userId, borrowerId);
            successApiResponse(res, { status: 200, message: 'Emprunteur récupéré avec succès', data: borrower });
        } catch (error) {
            next(error);
        }
    },

    findAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            const search = req.query;
            const borrowers = await borrowerService.findAll(userId, search);
            successApiResponse(res, { status: 200, message: 'Emprunteurs récupérés avec succès', data: borrowers });
        } catch (error) {
            next(error);
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            const borrowerId = req.params.id;
            const deletedBorrower = await borrowerService.delete(userId, borrowerId);
            successApiResponse(res, { status: 200, message: 'Emprunteur supprimé avec succès', data: deletedBorrower });
        } catch (error) {
            next(error);
        }
    },
};
