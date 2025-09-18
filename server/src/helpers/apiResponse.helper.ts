import { time } from 'console';
import { Response } from 'express';
export const successApiResponse = (res: Response, status: number, message: string, data?: any) => {
    return res.status(status).json({
        status,
        message,
        data: data || null,
        timestamp: new Date().toISOString(),
    });
};

export const errorApiResponse = (res: Response, status: number, message: string, errors?: any) => {
    return res.status(status).json({
        status,
        message,
        errors: errors || null,
        timestamp: new Date().toISOString(),
    });
};
