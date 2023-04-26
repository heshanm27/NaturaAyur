import express from "express";
import { getAllUsertList, getOneUser, updateUserProfile } from "../controller/user.controller";
import { addReviewForSeller, getReviewById, updateReview } from "../service/review.service";
import { getReviewForProduct, getReviewsForSeller } from "../controller/review.controller";

const Router = express.Router();
//default routes
Router.route("/produts").get(getReviewForProduct).post(addReviewForSeller);
Router.route("/seller").get(getReviewsForSeller).post(addReviewForSeller);
//paramterized routes
Router.route("/:id").get(getReviewById).patch(updateReview).delete();

export default Router;
