import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { SignUp } from "../service/auth.service";
import { CreateUserSignInInput, CreateUserSignUpInput, ForgotPasswordInput } from "../schema/auth.schema";
import { generateVerifiedEmailBody, generateResetPasswordEmailBody } from "../util/mail-html-body-gen";
import { sendEmail } from "../util/send-mail";
import { findUserByEmil } from "../service/user.service";
import JWT from "jsonwebtoken";
export const userSignUp = async (req: Request<{}, {}, CreateUserSignUpInput["body"]>, res: Response) => {
  try {
    const { email, password, firstName, lastName, address, avatar } = req.body;
    const token = await SignUp({ email, password, firstName, lastName, address, avatar });
    const emailBody = generateVerifiedEmailBody(firstName + " " + lastName, token);
    await sendEmail({
      toEmail: email,
      subject: "Verify Email",
      emailBody,
    });
    return res.status(200).json({
      message: "Please verify your email address",
    });
  } catch (e: any) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

export const userSignIn = async (req: Request<{}, {}, CreateUserSignInInput["body"]>, res: Response, next: NextFunction) => {
  passport.authenticate("local", (err: any, token: any) => {
    if (err)
      return res.status(400).json({
        message: err.message,
      });

    if (!token) {
      return res.status(400).json({
        message: "",
      });
    }
    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({
      message: "User Logged In Successfully",
    });
  })(req, res, next);
};

export const forgotPassword = async (req: Request<{}, {}, ForgotPasswordInput>, res: Response) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmil(email);
    console.log(user.email);
    const token = JWT.sign({ email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: "5m",
    });
    const emailBody = generateResetPasswordEmailBody(user.firstName + " " + user.lastName, token);
    // await sendEmail({
    //   toEmail: email,
    //   subject: "Reset Password",
    //   emailBody,
    // });

    return res.status(200).json({
      message: "Please check your email to reset password",
      token,
    });
  } catch (e: any) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const email = JWT.verify(token, process.env.JWT_SECRET!);
    console.log(email);

    res.redirect("http://localhost:3000/");

    // const user = await findUserByEmil(email);
    // if (user) {
    //   return res.status(200).json({
    //     message: "User found",
    //   });
    // }
  } catch (e: any) {
    return res.status(400).json({
      message: e.message,
    });
  }
};
