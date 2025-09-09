import { ZodError } from 'zod';
import { ApiResponse } from '../interfaces';
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let message = 'Erreur server';

    if (err instanceof ZodError) {
        message = err.issues.map((issue) => issue.message).join(', ');
    } else {
        message = err.message;
    }

    res.status(err.status || 500).json({
        success: false,
        data: null,
        status: err.status || 500,
        message: message,
        timestamp: new Date().toISOString(),
    });
};
