import { userService } from '../services';
import { Request, Response, NextFunction } from 'express';

export const userController = {
    getUserInfo: async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user!.id;

        try {
            const response = await userService.getUserInfo(userId);
            res.status(200).json({
                success: true,
                status: 200,
                data: response,
                message: 'User info retrieved successfully',
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    },

    editUserInfo: async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user!.id;
        const updateData = req.body;

        try {
            const updatedUser = await userService.editUserInfo(userId, updateData);
            res.status(200).json({
                success: true,
                status: 200,
                data: updatedUser,
                message: 'User info updated successfully',
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    },
};
