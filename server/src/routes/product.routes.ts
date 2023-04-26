import express from "express";
import {
  addNewProduct,
  getAllProductList,
  getOneProductDetails,
  getReviewsForProduct,
  getOneSellerProductList,
  updateProduct,
  deleteProduct,
  getNewArrivals,
  getPopularProducts,
} from "../controller/product.controller";
import validateSchema from "../middleware/schemavalidator.middleware";
import { getAllProductListSchema } from "../schema/product.schema";
import { upload } from "../util/multerConfig";
import { validateUserRoleAndToken } from "../middleware/auth.middleware";
import { ROLES } from "../models/user.model";
const Router = express.Router();

//default routes
Router.route("/")
  .get(validateSchema(getAllProductListSchema), getAllProductList)
  .post(validateUserRoleAndToken([ROLES.ADMIN, ROLES.SELLER]), upload.array("images[]", 6), addNewProduct);
Router.route("/seller").get(validateUserRoleAndToken([ROLES.ADMIN, ROLES.SELLER]), getOneSellerProductList);
Router.route("/newArrivals").get(getNewArrivals);
Router.route("/popular").get(getPopularProducts);

Router.route("/reviews/:id").get(validateUserRoleAndToken([ROLES.USER, ROLES.ADMIN, ROLES.SELLER]), getReviewsForProduct);
// //paramterized routes
Router.route("/:id")
  .get(getOneProductDetails)
  .patch(validateUserRoleAndToken([ROLES.ADMIN, ROLES.SELLER]), updateProduct)
  .delete(validateUserRoleAndToken([ROLES.ADMIN, ROLES.SELLER]), deleteProduct);

export default Router;
