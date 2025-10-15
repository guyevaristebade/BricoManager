import { Router } from 'express';

import { loanController } from './loan.controller';
import { authenticatedUser } from '@common/middlewares/auth.middleware';
import { zodValidator } from '@common/middlewares/zodValidator.middleware';
import { createLoanSchema } from './dtos/create-loan.dto';

export const loanRouter = Router();

loanRouter.post('/', authenticatedUser, zodValidator(createLoanSchema), loanController.create);
