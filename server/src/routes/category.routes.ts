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
import { validateUserRoleAndToken } from "../middleware/auth.middleware";
import { ROLES } from "../models/user.model";

const Router = express.Router();

//default routes
Router.route("/")
  .get(getAllCategories)
  .post(validateUserRoleAndToken([ROLES.ADMIN, ROLES.SELLER]), addNewCategory);
Router.route("/sub").post(validateUserRoleAndToken([ROLES.ADMIN, ROLES.SELLER]), addNewSubCategory);
Router.route("/:id")
  .get(getOneCategory)
  .patch(validateUserRoleAndToken([ROLES.ADMIN, ROLES.SELLER]), updateCategory)
  .delete(validateUserRoleAndToken([ROLES.ADMIN, ROLES.SELLER]), deleteCategory);
Router.route("/sub/:id")
  .get(getAllSubCategoriesForOneCategorey)
  .patch(validateUserRoleAndToken([ROLES.ADMIN, ROLES.SELLER]), updateSubCategory)
  .delete(validateUserRoleAndToken([ROLES.ADMIN, ROLES.SELLER]), deleteSubCategory);

export default Router;
