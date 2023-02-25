import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { SignUp } from "../service/auth.service";
import { CreateUserSignInInput, CreateUserSignUpInput, GenerateMagicLinkInput, MagicLinkType } from "../schema/auth.schema";
export const userSignUp = async (req: Request<{}, {}, CreateUserSignUpInput["body"]>, res: Response) => {
  try {
    const { email, password, firstName, lastName, address, avatar } = req.body;
    const token = await SignUp({ email, password, firstName, lastName, address, avatar });

    return res.status(200).json({
      token,
      message: "User Created Successfully",
    });
  } catch (e: any) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

export const userSignIn = async (req: Request<{}, {}, CreateUserSignInInput["body"]>, res: Response, next: NextFunction) => {
  passport.authenticate("local", (err: any, user: any) => {
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
};

export const generateMagicLink = async (req: Request<{}, {}, GenerateMagicLinkInput>, res: Response) => {
  try {
    if (req.body.type === MagicLinkType.VERIFY_EMAIL) {
    }
  } catch (e: any) {}
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
  } catch (e: any) {}
};

export const resetPassword = async (req: Request, res: Response) => {};
