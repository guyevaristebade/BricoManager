import { NextFunction, Request, Response } from 'express';
import { categoryService } from '../services';
import { successApiResponse } from 'helpers';
import { categorySchema } from 'validators';

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

    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categoryData = categorySchema.parse(req.body);
            const categoryResponse = await categoryService.create(categoryData);
            successApiResponse(res, 201, 'Category created successfully', categoryResponse);
        } catch (error) {
            next(error);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const categoryData = categorySchema.parse(req.body);
            const categoryResponse = await categoryService.update(id, categoryData);
            successApiResponse(res, 200, 'Category updated successfully', categoryResponse);
        } catch (error) {
            next(error);
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const categoryResponse = await categoryService.delete(id);
            successApiResponse(res, 200, 'Category deleted successfully', categoryResponse);
        } catch (error) {
            next(error);
        }
    },
};
