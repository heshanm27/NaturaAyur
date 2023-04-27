import { object, string, TypeOf, nativeEnum } from "zod";
export const createUserSignInSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email({ message: "Email must be a valid email address" }),
    password: string({
      required_error: "Password is required",
    })
      .min(6, { message: "Password must be at least 6 characters" })
      .max(50, { message: "Password must be at most 50 characters" }),
  }),
});

export type CreateUserSignInInput = TypeOf<typeof createUserSignInSchema>;

export const forgotPasswordSchema = object({
  email: string({
    required_error: "Email is required",
  }).email({ message: "Email must be a valid email address" }),
});

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>;
