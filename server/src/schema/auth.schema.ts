import { object, string, TypeOf, nativeEnum } from "zod";

export const createUserSignUpSchema = object({
  body: object({
    firstName: string({
      required_error: "First name is required",
    })
      .min(2, { message: "First name must be at least 2 characters" })
      .max(50, { message: "First name must be at most 50 characters" }),
    lastName: string({
      required_error: "Last name is required",
    })
      .min(2, { message: "Last name must be at least 2 characters" })
      .max(50, { message: "Last name must be at most 50 characters" }),
    email: string({
      required_error: "Email is required",
    }).email({ message: "Email must be a valid email address" }),
    password: string({
      required_error: "Password is required",
    })
      .min(6, { message: "Password must be at least 6 characters" })
      .max(50, { message: "Password must be at most 50 characters" }),
    confirmPassword: string({
      required_error: "Confirm password is required",
    })
      .min(6, { message: "Confirm password must be at least 6 characters" })
      .max(50, { message: "Confirm password must be at most 50 characters" }),
    address: object({
      street: string({}).min(2, { message: "Street must be at least 2 characters" }).max(150, { message: "Street must be at most 50 characters" }),
      city: string({}).min(2, { message: "City must be at least 2 characters" }).max(50, { message: "City must be at most 50 characters" }),
      postalCode: string({}).min(2, { message: "Postal code must be at least 2 characters" }).max(10, { message: "Postal code must be at most 10 characters" }),
      country: string({}).min(2, { message: "Country must be at least 2 characters" }).max(50, { message: "Country must be at most 50 characters" }),
    }).optional(),
    avatar: string({}).optional(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password and Password  do not match",
  }),
});

export type CreateUserSignUpInput = Omit<TypeOf<typeof createUserSignUpSchema>, "body.passwordConfirmation">;

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

export enum MagicLinkType {
  VERIFY_EMAIL = "VERIFY_EMAIL",
  RESET_PASSWORD = "RESET_PASSWORD",
  FORGOT_PASSWORD = "FORGOT_PASSWORD",
}

export const generateMagicLinkSchema = object({
  email: string({
    required_error: "Email is required",
  }).email({ message: "Email must be a valid email address" }),
  type: nativeEnum(MagicLinkType),
});

export type GenerateMagicLinkInput = TypeOf<typeof generateMagicLinkSchema>;
