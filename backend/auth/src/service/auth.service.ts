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

export async function VerifyUser(token: string): Promise<void> {
  try {
    const value: any = JWT.verify(token, process.env.JWT_SECRET!);
    console.log(value.id);
    const user = await UserSchema.findById(value.id);

    if (!user) throw new BadRequestError("User does not exist");
    user.isVerified = true;
    await user.save();
  } catch (e: any) {
    console.log(e);
    if (e.name === "TokenExpiredError") {
      throw new BadRequestError("Token Expired");
    }
    throw new BadRequestError("Invalid Token");
  }
}

export async function resetPassword(id: string, password: string) {
  try {
    const user = await UserSchema.findById(id);
    if (!user) throw new BadRequestError("User does not exist");
    const newPassword = await user.resetPassword(password);
    const updateUser = await UserSchema.findByIdAndUpdate(id, { password: newPassword }, { new: true });
    const login = await UserSchema.login(user.email, password);
    console.log("new user", updateUser);
  } catch (e: any) {
    console.log(e);
    throw new Error("Password Reset Failed");
  }
}
