import { Request, Response } from "express";
import {
  AddNewCategoryInput,
  AddNewSubCategoryInput,
  GetOneCategoryInput,
  GetAllSubCategoriesForOneCategoryInput,
  DeleteCategoryInput,
  DeleteSubCategoryInput,
  UpdateCategoryInput,
  UpdateSubCategoryInput,
} from "../schema/category.schema";

const addNewCategory = async (req: Request<{}, {}, AddNewCategoryInput["body"]>, res: Response) => {};

const addNewSubCategory = async (req: Request<AddNewSubCategoryInput["params"], {}, AddNewSubCategoryInput["body"]>, res: Response) => {};

const getAllCategories = async (req: Request, res: Response) => {};

const getOneCategory = async (req: Request<GetOneCategoryInput["params"], {}, {}>, res: Response) => {};

const getAllSubCategoriesForOneCategorey = async (req: Request<GetAllSubCategoriesForOneCategoryInput["params"], {}, {}>, res: Response) => {};

const updateCategory = async (req: Request<UpdateCategoryInput["params"], {}, UpdateCategoryInput["body"]>, res: Response) => {};

const updateSubCategory = async (req: Request<UpdateSubCategoryInput["params"], {}, UpdateSubCategoryInput["body"]>, res: Response) => {};

const deleteCategory = async (req: Request<DeleteCategoryInput["params"], {}, {}>, res: Response) => {};

const deleteSubCategory = async (req: Request<DeleteSubCategoryInput["params"], {}, DeleteSubCategoryInput["body"]>, res: Response) => {};

export {
  addNewCategory,
  addNewSubCategory,
  getAllSubCategoriesForOneCategorey,
  getAllCategories,
  getOneCategory,
  updateCategory,
  updateSubCategory,
  deleteCategory,
  deleteSubCategory,
};
