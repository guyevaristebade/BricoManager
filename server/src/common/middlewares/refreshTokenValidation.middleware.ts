import { Request, Response, NextFunction } from 'express';
import { UserPayload } from '@modules/auth';
import jwt from 'jsonwebtoken';
import { HttpException } from '@common/errors/httpException';
import env from '@config/env';

export const refreshTokenValidation = (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refresh_token;

    // on vérifie le token
    if (!refreshToken) throw new HttpException('Unauthorized Error', 401, 'refresh token invalide');

    try {
        // on vérifie la validité du token
        const decoded = jwt.verify(refreshToken, env.tokens.refreshSecret) as UserPayload;

        // s'il est valide on attache ses information à req
        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
};
