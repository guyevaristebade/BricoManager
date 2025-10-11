import { Router } from 'express';
import { userController } from '@modules/users';
import { authenticatedUser } from '@common/middlewares/auth.middleware';

export const userRouter = Router();

userRouter.get('/me', authenticatedUser, userController.getUserInfo);
userRouter.patch('/:id', authenticatedUser, userController.updateUserInfo);
