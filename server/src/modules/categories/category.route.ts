import { Router } from 'express';
import { categoryController, categorySchema } from '@modules/categories';
import { authenticatedUser } from '@common/middlewares/auth.middleware';
import { checkRole } from '@common/middlewares/checkRole.middleware';
import { zodValidator } from '@common/middlewares/zodValidator.middleware';

export const categoryRouter = Router();

categoryRouter.get('/', authenticatedUser, categoryController.findAll);
categoryRouter.get('/:id', authenticatedUser, categoryController.findById);
categoryRouter.post(
    '/',
    authenticatedUser,
    checkRole('ADMIN'),
    zodValidator(categorySchema),
    categoryController.create
);
categoryRouter.put(
    '/:id',
    authenticatedUser,
    checkRole('ADMIN'),
    zodValidator(categorySchema),
    categoryController.update
);
categoryRouter.delete('/:id', authenticatedUser, checkRole('ADMIN'), categoryController.delete);
