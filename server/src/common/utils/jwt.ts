import jwt from 'jsonwebtoken';
import env from '@config/env';
import { UserPayload } from '@modules/auth';

export const verifyToken = (token: string): UserPayload => {
    return jwt.verify(token, env.tokens.accessSecret) as UserPayload;
};

export const verifyRefreshToken = (token: string): UserPayload => {
    return jwt.verify(token, env.tokens.refreshSecret) as UserPayload;
};

export const generateRefreshToken = (user: UserPayload) => {
    return jwt.sign(user, env.tokens.refreshSecret, {
        expiresIn: '7d',
    });
};

export const generateAccessToken = (user: UserPayload) => {
    return jwt.sign(user, env.tokens.accessSecret, { expiresIn: '15m' });
};
