import { Response } from 'express';

interface IResponseSuccessData {
    success?: boolean;
    status: number;
    message: string;
    data?: any;
    path?: string;
}

export const successApiResponse = (res: Response, { status, message, data, path }: IResponseSuccessData) => {
    return res.status(status).json({
        success: true,
        status,
        message,
        data: data || null,
        path,
        timestamp: new Date().toISOString(),
    });
};

interface IResponseErrorData {
    success?: boolean;
    status: number;
    message: string;
    errors?: any;
    path?: string;
}

export const errorApiResponse = (res: Response, { status, message, errors, path }: IResponseErrorData) => {
    return res.status(status).json({
        success: false,
        status,
        message,
        path,
        errors: errors,
        timestamp: new Date().toISOString(),
    });
};
