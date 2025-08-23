import { Router } from 'express';
import { authMiddlewares } from '../middlewares';
import { loginController, logoutController, refreshController, registerController } from '../controllers';

export const authRouter = Router();

authRouter.post('/register', registerController);

authRouter.post('/login', loginController);

authRouter.get('/refresh-token', authMiddlewares.refreshTokenValidation, refreshController);

authRouter.delete('/logout', authMiddlewares.authenticatedUser, logoutController);
