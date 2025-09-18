import { Request, Response, NextFunction } from 'express';
import { authService } from '../services';
import { registerSchema } from '../validators';
import { generateCookie } from '../helpers';

export const authController = {
    register: async (req: Request, res: Response, next: NextFunction) => {
        const validatedData = registerSchema.parse(req.body);
        try {
            const user = await authService.register(validatedData);
            res.status(201).json({
                success: true,
                status: 201,
                data: user,
                message: 'User registered successfully',
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    },

    login: async (req: Request, res: Response, next: NextFunction) => {
        // const parsedData = loginSchema.parse(req.body);

        try {
            const loginResponse = await authService.login(req.body);

            // on stock le refreshToken dans un cookie
            generateCookie(loginResponse.refreshToken, res);

            res.status(201).json({
                success: true,
                status: 201,
                data: loginResponse,
                message: 'User logged in successfully',
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    },

    refreshToken: async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user!.id;
        const refreshToken = req.cookies.refresh_token;

        try {
            const response = await authService.refresh(userId!, refreshToken);

            res.status(201).json({
                success: true,
                status: 201,
                data: response,
                message: 'Token refresh successfully',
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    },

    logout: async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user!.id;

        try {
            const logoutResponse = await authService.logout(userId);
            res.clearCookie('refresh_token');

            res.status(201).json({
                success: true,
                status: 201,
                data: logoutResponse,
                message: 'Déconnexion successfully',
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    },
};
