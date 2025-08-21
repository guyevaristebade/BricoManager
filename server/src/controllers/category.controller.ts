import { NextFunction, Request, Response } from 'express';
import { categorySchema } from '../schemas';
import { categoryService } from '../services';

export const createCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryParsedData = categorySchema.parse(req.body);
        const apiResponse = await categoryService.create(categoryParsedData);
        res.status(apiResponse.status).json(apiResponse);
    } catch (error) {
        next(error);
    }
};

export const editCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryParsedData = categorySchema.parse(req.body);
        const apiResponse = await categoryService.update(req.params.categoryId, categoryParsedData);
        res.status(apiResponse.status).json(apiResponse);
    } catch (error) {
        next(error);
    }
};

export const deleteCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const apiResponse = await categoryService.delete(req.params.categoryId);
        res.status(apiResponse.status).json(apiResponse);
    } catch (error) {
        next(error);
    }
};
