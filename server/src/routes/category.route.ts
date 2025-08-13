import { authMiddlewares } from '../middlewares';
import { Router } from 'express';
import {
    createCategoryController,
    deleteCategoryController,
    editCategoryController,
} from 'controllers/category.controller';

export const categoryRouter = Router();

categoryRouter.post('/', authMiddlewares.authenticatedUser, createCategoryController);
categoryRouter.put('/:categoryId', authMiddlewares.authenticatedUser, editCategoryController);
categoryRouter.delete('/:categoryId', authMiddlewares.authenticatedUser, deleteCategoryController);
