import { UnauthorizedError } from 'errors';
import { Request, Response, NextFunction } from 'express';
import { UserPayload } from 'interfaces';
import jwt from 'jsonwebtoken';

export const refreshTokenValidation = (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refresh_token;

    // on vérifie le token
    if (!refreshToken) throw new UnauthorizedError('Invalid refresh token');

    try {
        // on vérifie la validité du token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as UserPayload;

        // s'il est valide on attache ses information à req
        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
};
