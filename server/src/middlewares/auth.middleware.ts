import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserPayload } from '../interfaces';
import { UnauthorizedError } from '../errors';

export const authenticatedUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    // on vérifie le token
    if (!token) throw new UnauthorizedError('Accès refusé');

    try {
        // on vérifie la validité du token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as UserPayload;

        // s'il est valide on attache ses information à req
        // Ici on étend dynamiquement l'objet Request avec la propriété user
        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
};
