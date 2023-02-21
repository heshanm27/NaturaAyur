import UserSchema from "../models/user.model";

export async function SignUp(input: any): Promise<any> {
  const user = await UserSchema.create(input);
  return user;
}
