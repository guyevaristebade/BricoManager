import { userService } from '../services';
import { Request, Response, NextFunction } from 'express';

export const getUserInfosController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        console.log(userId);
        const response = await userService.find(userId);
        res.status(response.status).json(response);
    } catch (error) {
        next(error);
    }
};
