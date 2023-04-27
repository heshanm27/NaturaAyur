import { isValidObjectId } from "mongoose";
import { object, string, TypeOf, nativeEnum, number, array } from "zod";

export const addCategorySchema = object({
  body: object({
    name: string({}).min(2, { message: "Name must be at least 2 characters" }).max(50, { message: "Name must be at most 50 characters" }),
    subCategory: array(object({}).partial().extend({})).optional(),
  }),
});

// Schema for adding a new subcategory
export const addNewSubCategorySchema = object({
  params: object({
    id: string({ required_error: "Category id is required" }).refine((data) => isValidObjectId(data), { message: "Id must be a valid Id" }),
  }),
  body: object({
    name: string({}).min(2, { message: "Name must be at least 2 characters" }).max(50, { message: "Name must be at most 50 characters" }),
  }),
});

// Schema for getting all subcategories for a category
export const getAllSubCategoriesForOneCategorySchema = object({
  params: object({
    id: string({ required_error: "Category id is required" }).refine((data) => isValidObjectId(data), { message: "Id must be a valid Id" }),
  }),
});

// Schema for getting one category
export const getOneCategorySchema = object({
  params: object({
    id: string({ required_error: "Category id is required" }).refine((data) => isValidObjectId(data), { message: "Id must be a valid Id" }),
  }),
});

// Schema for updating a category
export const updateCategorySchema = object({
  params: object({
    id: string({ required_error: "Category id is required" }).refine((data) => isValidObjectId(data), { message: "Id must be a valid Id" }),
  }),
  body: object({
    name: string().min(2, { message: "Name must be at least 2 characters" }).max(50, { message: "Name must be at most 50 characters" }),
  }),
});

// Schema for updating a subcategory
export const updateSubCategorySchema = object({
  params: object({
    id: string({ required_error: "Category id is required" }).refine((data) => isValidObjectId(data), { message: "Id must be a valid Id" }),
  }),
  body: object({
    name: string().min(2, { message: "Name must be at least 2 characters" }).max(50, { message: "Name must be at most 50 characters" }),
  }),
});

// Schema for deleting a category
export const deleteCategorySchema = object({
  params: object({
    id: string({ required_error: "Category id is required" }).refine((data) => isValidObjectId(data), { message: "Id must be a valid Id" }),
  }),
});

// Schema for deleting a subcategory
export const deleteSubCategorySchema = object({
  params: object({
    id: string({ required_error: "Category id is required" }).refine((data) => isValidObjectId(data), { message: "Id must be a valid Id" }),
  }),
  body: object({
    name: string().min(2, { message: "Name must be at least 2 characters" }).max(50, { message: "Name must be at most 50 characters" }),
  }),
});

export type AddNewCategoryInput = TypeOf<typeof addCategorySchema>;
export type AddNewSubCategoryInput = TypeOf<typeof addNewSubCategorySchema>;
export type GetAllSubCategoriesForOneCategoryInput = TypeOf<typeof getAllSubCategoriesForOneCategorySchema>;
export type GetOneCategoryInput = TypeOf<typeof getOneCategorySchema>;
export type UpdateCategoryInput = TypeOf<typeof updateCategorySchema>;
export type UpdateSubCategoryInput = TypeOf<typeof updateSubCategorySchema>;
export type DeleteCategoryInput = TypeOf<typeof deleteCategorySchema>;
export type DeleteSubCategoryInput = TypeOf<typeof deleteSubCategorySchema>;
