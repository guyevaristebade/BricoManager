import { authMiddlewares } from '../middlewares';
import { Router } from 'express';
import { categoryController } from '../controllers';

export const categoryRouter = Router();

// Routes for categories (example routes, adjust as needed)
categoryRouter.get('/', authMiddlewares.authenticatedUser, categoryController.findAll);
categoryRouter.get('/:id', authMiddlewares.authenticatedUser, categoryController.findById);
// categoryRouter.post('/', authMiddlewares.authenticatedUser, createCategoryController);
// categoryRouter.put('/:categoryId', authMiddlewares.authenticatedUser, editCategoryController);
// categoryRouter.delete('/:categoryId', authMiddlewares.authenticatedUser, deleteCategoryController);
