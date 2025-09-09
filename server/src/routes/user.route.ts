import { Router } from 'express';
import { userController } from '../controllers';
import { authenticatedUser } from '../middlewares';

export const userRouter = Router();

userRouter.get('/me', authenticatedUser, userController.getUserInfo);
userRouter.patch('/:id', authenticatedUser, userController.editUserInfo);
