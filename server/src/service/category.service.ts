import { BadRequestError } from "../errors";
import CategorySchema from "../models/category.model";

const addNewCategory = async (input: string) => {
  const category = await CategorySchema.create({ name: input });
  return category;
};
const getAllCategories = async () => {
  const categories = await CategorySchema.find();
  return categories;
};

const getOneCategory = async (id: string) => {
  const foundCategory = await CategorySchema.findById(id);
  return foundCategory;
};

const updateCategory = async (id: string, input: string) => {
  const updatedCategory = await CategorySchema.findByIdAndUpdate(id, { name: input }, { new: true });
  return updatedCategory;
};

const deleteCategory = async (id: string) => {
  const deletedCategory = await CategorySchema.findByIdAndDelete(id);
  return deletedCategory;
};

const addNewSubCategory = async (id: string, input: string) => {
  const category = await CategorySchema.findByIdAndUpdate(id, { $addToSet: { subCategory: input } }, { new: true });
  return category;
};

const getAllSubCategoriesForOneCategorey = async (id: string) => {
  const subCategory = await CategorySchema.findById(id);
  if (!subCategory) throw new BadRequestError("Category not found");
  return subCategory?.subCategory;
};

const updateSubCategory = async (id: string, input: string, subCategory: string) => {
  const updatedCategory = await CategorySchema.findByIdAndUpdate(id, { $set: { subCategory: input } }, { new: true });
  return updatedCategory;
};

const deleteSubCategory = async (id: string, subCategory: string) => {
  const deletedCategory = await CategorySchema.findByIdAndUpdate(id, { $pull: { subCategory: subCategory } }, { new: true });
  return deletedCategory;
};

export {
  addNewCategory,
  getAllCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
  addNewSubCategory,
  getAllSubCategoriesForOneCategorey,
  updateSubCategory,
  deleteSubCategory,
};
