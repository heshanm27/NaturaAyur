"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controller/auth.controller");
const schemavalidator_middleware_1 = __importDefault(require("../middleware/schemavalidator.middleware"));
const auth_schema_1 = require("../schema/auth.schema");
const Router = express_1.default.Router();
Router.route("/signUp").post((0, schemavalidator_middleware_1.default)(auth_schema_1.createUserSignUpSchema), auth_controller_1.userSignUp);
Router.route("/signIn").post((0, schemavalidator_middleware_1.default)(auth_schema_1.createUserSignInSchema), auth_controller_1.userSignIn);
Router.route("/forgotPassword").post(auth_controller_1.forgotPassword);
Router.route("/resetPassword/:token").get(auth_controller_1.resetPassword);
Router.route("/test").get((req, res) => res.send("Auth Route"));
exports.default = Router;
//# sourceMappingURL=auth.routes.js.map