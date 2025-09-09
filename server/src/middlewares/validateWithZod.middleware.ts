import { ZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateWithZod = (schema: ZodObject<any, any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            next(error);
        }
    };
};
