import express from "express";
import {
  addNewProduct,
  getAllProductList,
  getOneProductDetails,
  getReviewsForProduct,
  getOneSellerProductList,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller";
import validateSchema from "../middleware/schemavalidator.middleware";
import { getAllProductListSchema } from "../schema/product.schema";
import { upload } from "../util/multerConfig";
const Router = express.Router();

//default routes
Router.route("/").get(validateSchema(getAllProductListSchema), getAllProductList).post(upload.array("images[]", 6), addNewProduct);

//paramterized routes
Router.route("/:id").get(getOneProductDetails).patch(updateProduct).delete(deleteProduct);
Router.route("/reviews/:id").get(getReviewsForProduct);
Router.route("/seller/:id").get(getOneSellerProductList);
export default Router;
