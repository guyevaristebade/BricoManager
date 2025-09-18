import { authenticatedUser, checkRole } from '../middlewares';
import { Router } from 'express';
import { categoryController } from '../controllers';

export const categoryRouter = Router();

categoryRouter.get('/', authenticatedUser, categoryController.findAll);
categoryRouter.get('/:id', authenticatedUser, categoryController.findById);
categoryRouter.post('/', authenticatedUser, checkRole('ADMIN'), categoryController.create);
categoryRouter.put('/:id', authenticatedUser, checkRole('ADMIN'), categoryController.update);
categoryRouter.delete('/:id', authenticatedUser, checkRole('ADMIN'), categoryController.delete);
