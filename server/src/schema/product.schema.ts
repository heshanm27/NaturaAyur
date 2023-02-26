import { isValidObjectId } from "mongoose";
import { number, object, string, TypeOf } from "zod";

export const addProdutSchema = object({
  name: string({
    required_error: "Product name is required",
  })
    .min(2, { message: "Name must be at least 2 characters" })
    .max(150, { message: "Name must be at most 150 characters" }),
  description: string({
    required_error: "Product description is required",
  })
    .min(2, { message: "Description must be at least 2 characters" })
    .max(350, { message: "Description must be at most 350 characters" }),
  price: number({
    required_error: "Product price is required",
  })
    .gte(0, { message: "Price must be at grater than or equal to 0" })
    .lte(1500000, { message: "Price must be at most 1,500,000 characters" }),
  stock: number({
    required_error: "Product quantity is required",
  })
    .gt(0, { message: "Quantity must be at grater than or equal to 0" })
    .lte(1000000, { message: "Quantity must be at most 1,000,000 characters" }),
  category: string({
    required_error: "Product category is required",
  })
    .min(2, { message: "Category must be at least 2 characters" })
    .max(50, { message: "Category must be at most 50 characters" }),
  subCategory: string({
    required_error: "Product sub category is required",
  })
    .min(2, { message: "Sub Category must be at least 2 characters" })
    .max(50, { message: "Sub Category must be at most 50 characters" }),
  images: object({}).optional(),
  seller: string({
    required_error: "Product seller is required",
  })
    .min(2, { message: "Seller must be at least 2 characters" })
    .refine((data) => isValidObjectId(data), { message: "Seller must be a valid Id" }),
});

export type AddProductInput = TypeOf<typeof addProdutSchema>;

export const updateProductSchema = addProdutSchema.partial().extend({
  id: string({}).refine((data) => isValidObjectId(data), { message: "Id must be a valid Id" }),
});

export type UpdateProductInput = TypeOf<typeof updateProductSchema>;

export const deleteProductSchema = object({
  id: string({
    required_error: "Product id is required",
  })
    .min(2, { message: "Id must be at least 2 characters" })
    .refine((data) => isValidObjectId(data), { message: "Id must be a valid Id" }),
});

export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
