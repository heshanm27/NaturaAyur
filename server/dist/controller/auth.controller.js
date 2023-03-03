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
exports.resetPassword = exports.forgotPassword = exports.userSignIn = exports.userSignUp = void 0;
const passport_1 = __importDefault(require("passport"));
const auth_service_1 = require("../service/auth.service");
const mail_html_body_gen_1 = require("../util/mail-html-body-gen");
const send_mail_1 = require("../util/send-mail");
const user_service_1 = require("../service/user.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, firstName, lastName, address, avatar } = req.body;
        const token = yield (0, auth_service_1.SignUp)({ email, password, firstName, lastName, address, avatar });
        const emailBody = (0, mail_html_body_gen_1.generateVerifiedEmailBody)(firstName + " " + lastName, token);
        yield (0, send_mail_1.sendEmail)({
            toEmail: email,
            subject: "Verify Email",
            emailBody,
        });
        return res.status(200).json({
            message: "Please verify your email address",
        });
    }
    catch (e) {
        return res.status(400).json({
            message: e.message,
        });
    }
});
exports.userSignUp = userSignUp;
const userSignIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate("local", (err, user) => {
        if (err)
            return res.status(400).json({
                message: err.message,
            });
        if (!user) {
            return res.status(400).json({
                message: "",
            });
        }
        return res.status(200).json({
            message: "User Logged In Successfully",
            token: user,
        });
    })(req, res, next);
});
exports.userSignIn = userSignIn;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield (0, user_service_1.findUserByEmil)(email);
        console.log(user.email);
        const token = jsonwebtoken_1.default.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "5m",
        });
        const emailBody = (0, mail_html_body_gen_1.generateResetPasswordEmailBody)(user.firstName + " " + user.lastName, token);
        // await sendEmail({
        //   toEmail: email,
        //   subject: "Reset Password",
        //   emailBody,
        // });
        return res.status(200).json({
            message: "Please check your email to reset password",
            token,
        });
    }
    catch (e) {
        return res.status(400).json({
            message: e.message,
        });
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        const email = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log(email);
        res.redirect("http://localhost:3000/");
        // const user = await findUserByEmil(email);
        // if (user) {
        //   return res.status(200).json({
        //     message: "User found",
        //   });
        // }
    }
    catch (e) {
        return res.status(400).json({
            message: e.message,
        });
    }
});
exports.resetPassword = resetPassword;
//# sourceMappingURL=auth.controller.js.map