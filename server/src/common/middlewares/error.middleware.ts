import { ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { errorApiResponse } from '@common/utils';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
        const message = err.issues.map((issue) => issue.message).join(', ');
        const errors = JSON.parse(err as unknown as string);

        errorApiResponse(res, {
            status: 400,
            message,
            errors: errors,
            path: req.originalUrl,
        });
    }

    errorApiResponse(res, {
        status: err.status || 500,
        message: err.message || 'Erreur serveur',
        path: req.originalUrl,
    });
};
