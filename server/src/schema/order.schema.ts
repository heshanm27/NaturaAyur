import { isValidObjectId } from "mongoose";
import { object, string, TypeOf, nativeEnum, number } from "zod";

export const addOrderSchema = object({
  user: string({}).refine((data) => isValidObjectId(data), { message: "UserId must be a valid Id" }),
  products: object({
    product: string({}).refine((data) => isValidObjectId(data), { message: "ProductId must be a valid Id" }),
    quantity: number({}).positive({ message: "Quantity must be a positive number" }),
  }),
  shippingAddress: object({
    address: string({}).min(2, { message: "Address must be at least 2 characters" }).max(350, { message: "Address must be at most 350 characters" }),
    city: string({}).min(2, { message: "City must be at least 2 characters" }).max(350, { message: "City must be at most 350 characters" }),
    postalCode: number({}).positive({ message: "PostalCode must be a positive number" }),
    country: string({}).min(2, { message: "Country must be at least 2 characters" }).max(350, { message: "Country must be at most 350 characters" }),
  }),
  paymentMethod: string({})
    .min(2, { message: "PaymentMethod must be at least 2 characters" })
    .max(350, { message: "PaymentMethod must be at most 350 characters" }),
});

export type AddOrderInput = TypeOf<typeof addOrderSchema>;

export const updateOrderSchema = addOrderSchema.partial().extend({
  id: string({}).refine((data) => isValidObjectId(data), { message: "OrderId must be a valid Id" }),
});

export type UpdateOrderInput = TypeOf<typeof updateOrderSchema>;

export const deleteOrderSchema = object({
  id: string({}).refine((data) => isValidObjectId(data), { message: "OrderId must be a valid Id" }),
});

export type DeleteOrderInput = TypeOf<typeof deleteOrderSchema>;
