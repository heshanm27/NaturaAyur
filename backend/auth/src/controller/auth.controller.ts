import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { SignUp, VerifyUser, resetPassword } from "../service/auth.service";
import { CreateUserSignInInput, ForgotPasswordInput } from "../schema/auth.schema";
import { generateVerifiedEmailBody, generateResetPasswordEmailBody } from "../util/mail-html-body-gen";
import { sendEmail } from "../util/send-mail";
import { findUserByEmil, findUserById } from "../service/user.service";
import JWT from "jsonwebtoken";
import { IToken } from "../model/user.model";
import { BadRequestError } from "../errors";
import { genrateAccessToken } from "../util/genrate-jwt-keys";

export const userSignUp = async (req: any, res: Response) => {
  try {
    const { email, password, firstName, lastName, contactNo } = req.body;
    let avatar = "https://ds-nature-ayur.s3.ap-southeast-1.amazonaws.com/Default_pfp.svg.png";
    if (req.files && req.files.length > 0) {
      avatar = req.files[0].location;
    }

    const token = await SignUp({ email, password, firstName, lastName, avatar, contactNo });
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
  passport.authenticate("local", (err: any, token: IToken) => {
    if (err)
      return res.status(400).json({
        message: err.message,
      });

    if (!token) {
      return res.status(400).json({
        message: "",
      });
    }
    return res.status(200).json({
      ...token,
      message: "User Logged In Successfully",
    });
  })(req, res, next);
};

export const issueNewAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken;
  console.log(refreshToken);
  if (!refreshToken) throw new BadRequestError("Token not found");

  try {
    const { id }: any = JWT.verify(refreshToken, process.env.JWT_REFRESH_TOKEN!);

    const user = await findUserById(id);

    if (!user) throw new BadRequestError("User not found");

    const accessToken = genrateAccessToken(user);

    return res.status(200).json({
      accessToken,
      message: "New Access Token Issued",
    });
  } catch (e: any) {
    if (e instanceof JWT.TokenExpiredError) {
      throw new BadRequestError("Token Expired");
    }
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    console.log(token);
    if (!token) throw new BadRequestError("Token not found");
    await VerifyUser(token);
    // res.redirect(`${process.env.FRONTEND}/signin`);
    res.json({
      message: "Email Verified",
      redirectUrl: `/signin`,
    });
  } catch (e: any) {
    console.log(e.message);
    return res.status(400).json({
      message: e.message,
    });
  }
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

export const userResetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    // const email = JWT.verify(token, process.env.JWT_SECRET!);
    // console.log(email);

    await resetPassword(token, password);
    return res.status(200).json({
      message: "Password Reset Successfully",
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};
