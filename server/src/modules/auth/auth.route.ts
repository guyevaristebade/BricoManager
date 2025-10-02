import { Router } from 'express';
import { authenticatedUser } from '@common/middlewares/auth.middleware';
import { authController, loginSchema, registerSchema } from '@modules/auth';
import { zodValidator } from '@common/middlewares/zodValidator.middleware';
import { refreshTokenValidation } from '@common/middlewares/refreshTokenValidation.middleware';

export const authRouter = Router();

authRouter.post('/register', zodValidator(registerSchema), authController.register);

authRouter.post('/login', zodValidator(loginSchema), authController.login);

authRouter.get('/refresh-token', refreshTokenValidation, authController.refreshToken);

authRouter.delete('/logout', authenticatedUser, authController.logout);
