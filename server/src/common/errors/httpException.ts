export class HttpException extends Error {
    public status: number;
    constructor(name = 'Http Exception', status: number, message: string) {
        super(message);
        this.name = name;
        this.status = status;
    }
}
