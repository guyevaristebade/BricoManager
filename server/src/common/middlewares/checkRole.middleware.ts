import { HttpException } from '@common/errors/httpException';
import { userRepository } from '@modules/users';
import { Request, Response, NextFunction } from 'express';

export const checkRole = (role: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userRole = await userRepository.getUserRole(req.user!.id);
        if (userRole !== role)
            throw new HttpException('Forbidden Error', 403, "Accès interdit, Vous n'êtes pas autorisé");
        next();
    };
};
