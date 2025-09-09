import { Router } from 'express';
import { getUserInfosController } from '../controllers';
import { authenticatedUser } from '../middlewares';

export const userRouter = Router();

userRouter.get('/me', authenticatedUser, getUserInfosController);
