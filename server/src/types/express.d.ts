import { UserPayload } from '../interfaces';

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}
