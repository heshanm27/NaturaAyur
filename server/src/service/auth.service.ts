import UserSchema from "../models/user.model";
import { BadRequestError, Unauthenticated } from "../errors/index";
export async function SignUp(input: any): Promise<any> {
  try {
    const user = await UserSchema.create(input);
    return user;
  } catch (e: any) {
    if (e.code === 11000) {
      throw new BadRequestError("User Already Exist");
    }
    throw new Error(e);
  }
}

export async function SignIn(input: any): Promise<any> {
  try {
    const user = await UserSchema.login(input.email, input.password);
    return user;
  } catch (e: any) {
    throw new Unauthenticated(e.message);
  }
}
