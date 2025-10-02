import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserPayload } from '@modules/auth';
import { HttpException } from '@common/errors/httpException';
import { verifyToken } from '@common/utils/jwt';

export const authenticatedUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    // on vérifie le token
    if (!token) throw new HttpException('Unauthorized Error', 401, 'Accès refusé !');

    try {
        // on vérifie la validité du token
        const decoded = verifyToken(token);

        // s'il est valide on attache ses information à req
        // Ici on étend dynamiquement l'objet Request avec la propriété user
        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
};
