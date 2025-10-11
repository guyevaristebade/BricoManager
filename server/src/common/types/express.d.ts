import { UserPayload } from '@modules/auth';

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}
