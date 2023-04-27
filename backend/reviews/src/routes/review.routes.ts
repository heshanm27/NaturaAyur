import express from "express";

import { addReview, getReviewById, getReviewForProduct, getReviewsForSeller, updateReview } from "../controller/review.controller";

const Router = express.Router();
//default routes
Router.route("/").post(addReview);
Router.route("/products/:id").get(getReviewForProduct);
Router.route("/seller/:id").get(getReviewsForSeller);
//paramterized routes
Router.route("/:id").get(getReviewById).patch(updateReview).delete();

export default Router;
