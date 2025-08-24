import { NextFunction, Request, Response } from 'express';
import { categorySchema } from '../schemas';
import { categoryService } from '../services';

export const categoryController = {
    findAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const apiResponse = await categoryService.findAll();
            res.status(apiResponse.status).json(apiResponse);
        } catch (error) {
            next(error);
        }
    },

    findById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const apiResponse = await categoryService.findById(id);
            res.status(apiResponse.status).json(apiResponse);
        } catch (error) {
            next(error);
        }
    },
};
