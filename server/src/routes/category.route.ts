import { authenticatedUser } from '../middlewares';
import { Router } from 'express';
import { categoryController } from '../controllers';

export const categoryRouter = Router();

// Routes for categories (example routes, adjust as needed)
categoryRouter.get('/', authenticatedUser, categoryController.findAll);
categoryRouter.get('/:id', authenticatedUser, categoryController.findById);
// categoryRouter.post('/', authenticatedUser, createCategoryController);
// categoryRouter.put('/:categoryId', authenticatedUser, editCategoryController);
// categoryRouter.delete('/:categoryId', authenticatedUser, deleteCategoryController);
