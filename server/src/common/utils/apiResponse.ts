import { IResponseErrorData, IResponseSuccessData } from '@common/types/apiResponse';
import { Response } from 'express';

export const successApiResponse = (res: Response, { status, message, data, path, meta }: IResponseSuccessData) => {
    res.status(status).json({
        success: true,
        status,
        message,
        data: data || null,
        path,
        meta,
        timestamp: new Date().toISOString(),
    });
};

export const errorApiResponse = (res: Response, { status, message, errors, path, meta }: IResponseErrorData) => {
    res.status(status).json({
        success: false,
        status,
        message,
        path,
        meta,
        errors: errors,
        timestamp: new Date().toISOString(),
    });
};
