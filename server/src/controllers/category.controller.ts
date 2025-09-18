import { NextFunction, Request, Response } from 'express';
import { categoryService } from '../services';
import { successApiResponse } from 'helpers';

export const categoryController = {
    findAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categoryResponse = await categoryService.findAll();
            successApiResponse(res, 200, 'Categories retrieved successfully', categoryResponse);
        } catch (error) {
            next(error);
        }
    },

    findById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const categoryResponse = await categoryService.findById(id);
            successApiResponse(res, 200, 'Category retrieved successfully', categoryResponse);
        } catch (error) {
            next(error);
        }
    },
};
