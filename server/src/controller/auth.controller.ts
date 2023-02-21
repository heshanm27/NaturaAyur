import { Request, Response } from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { SignUp } from "../service/auth.service";
import { CreateUserSignUpInput } from "../schema/auth.schema";
export const userSignUp = async (req: Request<{}, {}, CreateUserSignUpInput["body"]>, res: Response) => {
  const { email, password } = req.body;
};

export const userSignIn = async (req: Request, res: Response) => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      const user = await SignUp({ email, password });
      if (user) {
        return done(null, user);
      } else {
      }
    })
  );
};

export const forgotPassword = async (req: Request, res: Response) => {};

export const resetPassword = async (req: Request, res: Response) => {};
