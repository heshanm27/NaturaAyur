// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import UserSchema, { IUser, ROLES } from "../models/user.model";
// import { BadRequestError, UnAuthorized } from "../errors";

// export function validateUserRoleAndToken(requiredRole: ROLES[]) {
//   return async function (req: Request, res: Response, next: NextFunction) {
//     // Get the token from the cookie header
//     const authHeader = req.headers?.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       throw new UnAuthorized("Authorization header is missing");
//     }

//     // Extract the token from the authorization header
//     const token = authHeader.split(" ")[1];

//     // Verify the token and extract the user data
//     try {
//       //extract the user id from the token
//       const { id }: any = jwt.verify(token, process.env.JWT_SECRET!);

//       //find the user in the database
//       const user: Pick<IUser, "role"> | null = await UserSchema.findById(id);

//       //check if the user is present
//       if (!user) {
//         throw new BadRequestError("User not found");
//       }
//       if (!requiredRole) {
//         //attach the user to the request object
//         req.user = user;
//         console.log("user", user);
//         //call the next middleware
//         next();
//       }
//       //check if the user has the required role
//       if (!requiredRole.includes(user.role as ROLES)) {
//         console.log("unauthorized in middleware");
//         throw new UnAuthorized("You are not authorized to access this resource");
//       }
//       //attach the user to the request object
//       req.user = user;

//       //call the next middleware
//       next();
//     } catch (err: any) {
//       throw new UnAuthorized("Invalid or expired token");
//     }
//   };
// }
