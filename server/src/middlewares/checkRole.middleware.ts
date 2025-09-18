import { UnauthorizedError } from 'errors';
import { Request, Response, NextFunction } from 'express';

export const checkRole = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.user!.role;
        if (userRole !== role) throw new UnauthorizedError('Access denied');
        next();
    };
};
