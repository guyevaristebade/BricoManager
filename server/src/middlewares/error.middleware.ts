import { ZodError } from 'zod';
import { ApiResponse } from '../types';
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let message = 'Erreur server';

    if (err instanceof ZodError) {
        message = err.message;
    } else {
        message = err.message;
    }

    const status = err.status || 500;
    const apiResponse: ApiResponse = {
        success: false,
        data: null,
        status,
        message: message,
        timestamp: new Date().toISOString(),
    };
    res.status(status).json(apiResponse);
};
