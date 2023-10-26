"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.AppError = void 0;
class AppError {
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.AppError = AppError;
const handleError = (err, res) => {
    const { message } = err;
    return res.status(500).json({
        status: "error",
        statusCode: 500,
        message,
    });
};
exports.handleError = handleError;
