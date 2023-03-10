import express from "express";
import { userSignIn, userSignUp, forgotPassword, resetPassword, issueNewAccessToken } from "../controller/auth.controller";
import validateSchema from "../middleware/schemavalidator.middleware";
import { createUserSignUpSchema, createUserSignInSchema } from "../schema/auth.schema";
const Router = express.Router();

Router.route("/signUp").post(validateSchema(createUserSignUpSchema), userSignUp);
Router.route("/signIn").post(validateSchema(createUserSignInSchema), userSignIn);
Router.route("/refresh").get(issueNewAccessToken);
Router.route("/forgotPassword").post(forgotPassword);
Router.route("/resetPassword/:token").get(resetPassword);
Router.route("/test").get((req, res) => res.send("Auth Route"));
export default Router;
