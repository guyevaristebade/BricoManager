import { ApiResponse } from '../types';
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // console.log(err.stack);
    const status = err.status || 500;
    const message = err.message || 'Erreur server';
    const apiResponse: ApiResponse = {
        success: false,
        data: null,
        status,
        message: message,
        timestamp: new Date().toISOString(),
    };
    res.status(status).json(apiResponse);
};
