import { authenticatedUser } from '@common/middlewares/auth.middleware';
import { Router } from 'express';
import { borrowerController } from './borrower.controller';
import { zodValidator } from '@common/middlewares/zodValidator.middleware';
import { borrowerSchema } from './dtos/create-borrower.dto';
import { updateBorrowerSchema } from './dtos/update-borrower.dto';

export const borrowerRouter = Router();

borrowerRouter.get('/', authenticatedUser, borrowerController.findAll);
borrowerRouter.get('/:id', authenticatedUser, borrowerController.findById);
borrowerRouter.post('/', authenticatedUser, zodValidator(borrowerSchema), borrowerController.create);
borrowerRouter.patch('/:id', authenticatedUser, zodValidator(updateBorrowerSchema), borrowerController.update);
borrowerRouter.delete('/:id', authenticatedUser, borrowerController.delete);
