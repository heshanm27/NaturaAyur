"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = __importDefault(require("./customError"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
class BadRequestError extends customError_1.default {
    constructor(message) {
        super(message, http_status_codes_1.default.BAD_REQUEST);
    }
}
exports.default = BadRequestError;
//# sourceMappingURL=badRequestError.js.map