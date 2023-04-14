import { object, string, TypeOf, boolean } from "zod";

export const UpdateUserToSellerSchema = object({
  isSeller: boolean({
    required_error: "isSeller is required",
  }),
  seller: object({
    storeName: string({
      required_error: "Store Name is required",
    })
      .min(2, { message: "Name must be at least 2 characters" })
      .max(75, { message: "Name must be at most 75 characters" }),
    logo: string({}).optional(),
    description: string({
      required_error: "Description is required",
    })
      .min(2, { message: "Description must be at least 2 characters" })
      .max(200, { message: "Description must be at most 200 characters" }),
  }),
});

export type UpdateUserToSellerInput = TypeOf<typeof UpdateUserToSellerSchema>;
