export class InternalServerError extends Error {
    status = 500;
    constructor(message = 'Internal Server Error') {
        super(message);
        this.name = 'InternalServerError';
    }
}
