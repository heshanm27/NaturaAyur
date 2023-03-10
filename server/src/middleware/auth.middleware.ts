import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import UserSchema, { IUser } from "../models/user.model";
export enum UserRole {
  Admin = "admin",
  User = "user",
}

export function validateUserRoleAndToken(requiredRole: UserRole) {
  return async function (req: Request, res: Response, next: NextFunction) {
    // Get the token from the cookie header
    const token = req.cookies.token;

    // Check if the token is present
    if (!token) {
      return res.status(401).json({ message: "Cookie is missing." });
    }

    // Verify the token and extract the user data
    try {
      //extract the user id from the token
      const { id }: any = jwt.verify(token, process.env.JWT_SECRET!);

      //find the user in the database
      const user: Pick<IUser, "isAdmin" | "isSeller"> | null = await UserSchema.findById(id);

      //check if the user is present
      if (!user) {
        return res.status(401).json({ message: "Invalid or expired token." });
      }

      //check if the user has the required role
      if (requiredRole === UserRole.Admin && user.isAdmin) {
        console.log("admin");
        return next();
      } else if (requiredRole === UserRole.User && user.isSeller) {
        console.log("user");
        return next();
      } else {
        return res.status(403).json({ message: "You do not have permission to perform this action." });
      }
    } catch (err: any) {
      if (err instanceof TokenExpiredError) {
        const token = req.cookies.token;
        const { id }: any = jwt.decode(token);
        const user: IUser | null = await UserSchema.findById(id);
        if (!user) {
          return res.status(401).json({ message: "Invalid or expired token.22" });
        }
        jwt.verify(user.refreshToken, process.env.JWT_SECRET!, (err: any, decoded: any) => {
          if (err) {
            return res.status(401).json({ message: "Invalid or expired token2" });
          }
          console.log("decoded", decoded);
          const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "10s" });
          res.cookie("token", newToken, { httpOnly: true });
          req.user = user;
          return next();
        });
      } else {
        return res.status(401).json({ message: "Invalid or expiredss token" });
      }
      //   return res.status(401).json({ message: "Invalid or expired token." });
    }
  };
}
