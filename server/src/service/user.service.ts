import UserSchema, { IUser } from "../models/user.model";
import { BadRequestError } from "../errors/index";

export async function findUserById(id: string): Promise<IUser> {
  const user = await UserSchema.findById(id);
  if (!user) throw new BadRequestError("User not found");
  return user;
}

export async function findUserByEmil(email: string): Promise<IUser> {
  const user = await UserSchema.findOne({ email });
  if (!user) throw new BadRequestError("No user found with this email");
  return user;
}
