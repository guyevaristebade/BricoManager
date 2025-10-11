import { successApiResponse } from '@common/utils/apiResponse';
import { userService } from '@modules/users';
import { Request, Response, NextFunction } from 'express';

export const userController = {
    getUserInfo: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            const response = await userService.getUserInfo(userId);
            successApiResponse(res, {
                status: 200,
                message: 'Informations utilisateur récupérées avec succès',
                data: response,
            });
        } catch (error) {
            next(error);
        }
    },

    updateUserInfo: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            const updateData = req.body;
            const updatedUser = await userService.updateUserInfo(userId, updateData);
            successApiResponse(res, {
                status: 200,
                message: 'Informations utilisateur mises à jour avec succès',
                data: updatedUser,
            });
        } catch (error) {
            next(error);
        }
    },
};
