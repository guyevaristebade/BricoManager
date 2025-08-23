import { Request } from 'express';

export interface UserPayload {
    id: string;
    email: string;
    name: string;
    role: string;
}

export interface userWithoutRole {
    id: string;
    email: string;
    name: string;
}

export interface UserPayloadWithTokens {
    user: UserPayload;
    accessToken: string;
    refreshToken: string;
}

export interface RequestWithUser extends Request {
    user: UserPayload;
}
