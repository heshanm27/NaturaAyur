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
import * as CategoryServices from "../service/category.service";
const addNewCategory = async (req: Request, res: Response) => {
  const { name, subCategory } = req.body;
  const category = await CategoryServices.addNewCategory(name, subCategory);
  res.status(201).json({ category });
};

const addNewSubCategory = async (req: Request<AddNewSubCategoryInput["params"], {}, AddNewSubCategoryInput["body"]>, res: Response) => {
  const { name } = req.body;
  const { id } = req.params;
  const subCategory = await CategoryServices.addNewSubCategory(name, id);
  res.status(201).json({ subCategory });
};

const getAllCategories = async (req: Request, res: Response) => {
  const categories = await CategoryServices.getAllCategories();
  res.status(200).json({ categories });
};

const getOneCategory = async (req: Request<GetOneCategoryInput["params"], {}, {}>, res: Response) => {};

const getAllSubCategoriesForOneCategorey = async (req: Request<GetAllSubCategoriesForOneCategoryInput["params"], {}, {}>, res: Response) => {
  const { id } = req.params;
  const subCategories = await CategoryServices.getAllSubCategoriesForOneCategorey(id);
  res.status(200).json({ subCategories });
};

const updateCategory = async (req: Request<UpdateCategoryInput["params"], {}, UpdateCategoryInput["body"]>, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const updatedCategory = await CategoryServices.updateCategory(id, name);
  res.status(200).json({ updatedCategory });
};

const updateSubCategory = async (req: Request<UpdateSubCategoryInput["params"], {}, UpdateSubCategoryInput["body"]>, res: Response) => {
  // const { id } = req.params;
  // const { name } = req.body;
  // const updatedSubCategory = await CategoryServices.updateSubCategory();
  // res.status(200).json({ updatedSubCategory });
};

const deleteCategory = async (req: Request<DeleteCategoryInput["params"], {}, {}>, res: Response) => {
  const { id } = req.params;
  const deletedCategory = await CategoryServices.deleteCategory(id);
  res.status(200).json({ deletedCategory });
};

const deleteSubCategory = async (req: Request<DeleteSubCategoryInput["params"], {}, DeleteSubCategoryInput["body"]>, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const deletedSubCategory = await CategoryServices.deleteSubCategory(id, name);
  res.status(200).json({ deletedSubCategory });
};

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
