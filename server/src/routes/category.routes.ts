import express from "express";
import {
  addNewCategory,
  addNewSubCategory,
  deleteCategory,
  deleteSubCategory,
  getAllCategories,
  getAllSubCategoriesForOneCategorey,
  getOneCategory,
  updateCategory,
  updateSubCategory,
} from "../controller/category.controller";

const Router = express.Router();

//default routes
Router.route("/").get(getAllCategories).post(addNewCategory);
Router.route("/sub").post(addNewSubCategory);
Router.route("/:id").get(getOneCategory).patch(updateCategory).delete(deleteCategory);
Router.route("/sub/:id").get(getAllSubCategoriesForOneCategorey).patch(updateSubCategory).delete(deleteSubCategory);

export default Router;
