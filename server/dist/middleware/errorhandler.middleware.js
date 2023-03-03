"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../errors/index");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const ErrorHandlerMiddleware = (err, req, res, next) => {
    console.log("Error Handler Middleware");
    if (err instanceof index_1.CustomError) {
        return res.status(err.statusCode).json({ error: err.message });
    }
    return res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
        error: err.message,
        msg: "Something went wrong, please try again later",
    });
};
exports.default = ErrorHandlerMiddleware;
//# sourceMappingURL=errorhandler.middleware.js.map