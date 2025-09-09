import { UnauthorizedError } from 'errors';
import { Request, Response, NextFunction } from 'express';

export const checkRole = (req: Request, res: Response, next: NextFunction) => {
    // Ici aussi, on accepte Request et on fait le cast si nécessaire

    const userRole = req.user?.role;
    if (userRole !== 'ADMIN') throw new UnauthorizedError('Access denied');

    next();
};
