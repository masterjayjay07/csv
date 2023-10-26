import { Response } from "express";

export class AppError {
    public readonly message: string;
    public readonly statusCode: number;

    constructor(statusCode: number, message: string) {
        this.statusCode = statusCode;
        this.message = message;
    }
}
export const handleError = (err: AppError, res: Response) => {
    const { message } = err;

    return res.status(500).json({
        status: "error",
        statusCode: 500,
        message,
    });
};