import express from "express";
import {
  addNewProduct,
  getAllProductList,
  getOneProductDetails,
  getReviewsForProduct,
  getProductByCategory,
  getOneSellerProductList,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller";
import validateSchema from "../middleware/schemavalidator.middleware";
import { addProdutSchema, getAllProductListSchema } from "../schema/product.schema";
const Router = express.Router();

//default routes
Router.route("/").get(validateSchema(getAllProductListSchema), getAllProductList).post(validateSchema(addProdutSchema), addNewProduct);

//paramterized routes
Router.route("/:id").get(getOneProductDetails).patch(updateProduct).delete(deleteProduct).post(getProductByCategory);
Router.route("/reviews/:id").get(getReviewsForProduct);
Router.route("/seller/:id").get(getOneSellerProductList);
export default Router;
