import { ZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const zodValidator = (schema: ZodObject<any, any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (error) {
            next(error);
        }
    };
};
