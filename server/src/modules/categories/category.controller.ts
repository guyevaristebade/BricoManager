import { NextFunction, Request, Response } from 'express';
import { categoryService } from '@modules/categories';
import { successApiResponse } from '@common/utils/apiResponse';

export const categoryController = {
    findAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categoryResponse = await categoryService.findAll();
            successApiResponse(res, {
                status: 200,
                message: 'Categories chargées avec succès',
                data: categoryResponse,
            });
        } catch (error) {
            next(error);
        }
    },

    findById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const categoryResponse = await categoryService.findById(id);
            successApiResponse(res, {
                status: 200,
                message: 'categorie chargée ave succès',
                data: categoryResponse,
            });
        } catch (error) {
            next(error);
        }
    },

    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createCatResponse = await categoryService.create(req.body);
            successApiResponse(res, {
                status: 201,
                message: 'Catégorie créee avec succès ',
                data: createCatResponse,
            });
        } catch (error) {
            next(error);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const categoryResponse = await categoryService.update(id, req.body);
            successApiResponse(res, {
                status: 200,
                message: 'Catégorie mise à jour avec succès',
                data: categoryResponse,
            });
        } catch (error) {
            next(error);
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await categoryService.delete(id);
            successApiResponse(res, {
                status: 200,
                message: 'Category deleted successfully',
            });
        } catch (error) {
            next(error);
        }
    },
};
