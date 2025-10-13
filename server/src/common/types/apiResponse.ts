export interface IResponseErrorData {
    success?: boolean;
    status: number;
    message: string;
    errors?: any;
    path?: string;
    meta?: any;
}

export interface IResponseSuccessData {
    success?: boolean;
    status: number;
    message: string;
    data?: any;
    path?: string;
    meta?: any;
}
