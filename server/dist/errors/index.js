"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessDenied = exports.Unauthenticated = exports.BadRequestError = exports.CustomError = void 0;
const customError_1 = __importDefault(require("./customError"));
exports.CustomError = customError_1.default;
const unauthenticated_1 = __importDefault(require("./unauthenticated"));
exports.Unauthenticated = unauthenticated_1.default;
const badRequestError_1 = __importDefault(require("./badRequestError"));
exports.BadRequestError = badRequestError_1.default;
const accessDenied_1 = __importDefault(require("./accessDenied"));
exports.AccessDenied = accessDenied_1.default;
//# sourceMappingURL=index.js.map