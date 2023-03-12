import UserSchema, { IToken } from "../models/user.model";
import { BadRequestError, UnAuthorized } from "../errors/index";
import JWT from "jsonwebtoken";

export async function SignUp(input: any): Promise<string> {
  try {
    const user = await UserSchema.create(input);
    return JWT.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: "10m" });
  } catch (e: any) {
    if (e.code === 11000) {
      throw new BadRequestError("User Already Exist");
    }
    throw new Error(e);
  }
}

export async function SignIn(input: any): Promise<IToken> {
  try {
    return await UserSchema.login(input.email, input.password);
  } catch (e: any) {
    throw new UnAuthorized(e.message);
  }
}
