"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignIn = exports.SignUp = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const index_1 = require("../errors/index");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function SignUp(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.create(input);
            return jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "10m" });
        }
        catch (e) {
            if (e.code === 11000) {
                throw new index_1.BadRequestError("User Already Exist");
            }
            throw new Error(e);
        }
    });
}
exports.SignUp = SignUp;
function SignIn(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield user_model_1.default.login(input.email, input.password);
        }
        catch (e) {
            throw new index_1.Unauthenticated(e.message);
        }
    });
}
exports.SignIn = SignIn;
//# sourceMappingURL=auth.service.js.map