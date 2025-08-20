import { Router } from 'express';
import { getUserInfosController } from '../controllers';
import { authMiddlewares } from '../middlewares';

export const userRouter = Router();

userRouter.get('/me', authMiddlewares.authenticatedUser, getUserInfosController);
