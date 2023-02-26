import UserSchema, { IUser } from "../models/user.model";
import { BadRequestError, Unauthenticated } from "../errors/index";

export async function findUserByEmil(email: string): Promise<IUser> {
  const user = await UserSchema.findOne({ email });
  if (!user) throw new BadRequestError("No user found with this email");
  return user;
}
