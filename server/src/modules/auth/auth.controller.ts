import { Request, Response, NextFunction } from 'express';
import { authService } from '@modules/auth';
import { generateCookie } from '@common/utils/generateCookie';
import { successApiResponse } from '@common/utils/apiResponse';

export const authController = {
    // brancher un service d'envoi de mail pour envoyer un mail de confirmation d'inscription
    // ainsi qu'un mail pour validation de l'adresse email
    register: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await authService.register(req.body);
            successApiResponse(res, {
                status: 201,
                message: 'Utilisateur enregistré avec succès',
            });
        } catch (error) {
            next(error);
        }
    },

    // vérifier si l'utilisateur a bien validé son adresse email avant de lui permettre de se connecter
    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { refreshToken, accessToken } = await authService.login(req.body);

            // on stock le refreshToken dans un cookie
            generateCookie(refreshToken, res);
            successApiResponse(res, {
                status: 200,
                message: 'Utilisateur connecté avec succès',
                data: { accessToken },
            });
        } catch (error) {
            next(error);
        }
    },

    refreshToken: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            const refreshTokenCooike = req.cookies.refresh_token;
            const { accessToken, refreshToken } = await authService.refresh(userId, refreshTokenCooike);

            // on met à jour le cookie avec le nouveau refreshToken
            // pour une rotation complète du refreshToken
            generateCookie(refreshToken, res);

            // on envoie le nouveau accessToken au client
            successApiResponse(res, {
                status: 200,
                message: 'Token rafraîchi avec succès',
                data: { accessToken },
            });
        } catch (error) {
            next(error);
        }
    },

    logout: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            await authService.logout(userId);
            res.clearCookie('refresh_token');
            successApiResponse(res, {
                status: 200,
                message: 'Utilisateur déconnecté avec succès',
                data: null,
            });
        } catch (error) {
            next(error);
        }
    },
};
