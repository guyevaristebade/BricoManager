import { ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { errorApiResponse } from '@common/utils/apiResponse';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
        const errors = err.issues.map((issue) => ({
            path: issue.path.join('.'),
            message: issue.message,
        }));

        errorApiResponse(res, {
            status: 400,
            message: 'Données invalides',
            errors,
            path: req.originalUrl,
        });
    }

    errorApiResponse(res, {
        status: err.status || 500,
        message: err.message || 'Erreur serveur',
        path: req.originalUrl,
    });
};
