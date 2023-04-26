import express from "express";
import { userSignIn, userSignUp, forgotPassword, issueNewAccessToken, verifyEmail, userResetPassword } from "../controller/auth.controller";
import validateSchema from "../middleware/schemavalidator.middleware";
import { createUserSignInSchema } from "../schema/auth.schema";
import { upload } from "../util/multerConfig";
const Router = express.Router();

Router.route("/signUp").post(upload.array("avatar"), userSignUp);
Router.route("/signIn").post(validateSchema(createUserSignInSchema), userSignIn);
Router.route("/verify/:token").get(verifyEmail);
Router.route("/refresh").get(issueNewAccessToken);
Router.route("/forgotPassword").post(forgotPassword);
Router.route("/resetPassword/:token").get(userResetPassword);
Router.route("/test").get((req, res) => res.send("Auth Route"));
export default Router;
