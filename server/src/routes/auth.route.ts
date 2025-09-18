import { Router } from 'express';
import { authenticatedUser, refreshTokenValidation, validateWithZod } from '../middlewares';
import { authController } from '../controllers';
import { loginSchema, registerSchema } from 'validators';

export const authRouter = Router();

authRouter.post('/register', validateWithZod(registerSchema), authController.register);

authRouter.post('/login', validateWithZod(loginSchema), authController.login);

authRouter.get('/refresh-token', refreshTokenValidation, authController.refreshToken);

authRouter.delete('/logout', authenticatedUser, authController.logout);
