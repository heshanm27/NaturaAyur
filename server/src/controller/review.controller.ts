import { Request, Response } from "express";
import * as ReviewServices from "../service/review.service";

export const addReview = async (req: Request, res: Response) => {
  const user: any = req.user;
  const { comment, product, rating, seller } = req.body;
  console.log(comment, product, rating, user?._id!);
  const review = {
    comment,
    product,
    rating,
    seller,
    user: user?._id!,
  };
  const addreview = await ReviewServices.addReview(review);
  res.status(200).json({
    message: "Review added successfully",
    addreview,
  });
};

export const getReviewForProduct = async (req: Request, res: Response) => {
  let { sortBy, order, limit, page } = req.query;
  let id = req.params.id;
  const review = await ReviewServices.findAllReviewsForProduct(id, { sortBy, order, limit, page });
  return review;
};

export const getReviewsForSeller = async (req: Request, res: Response) => {
  let { sortBy, order, limit, page } = req.query;
  let id = req.params.id;
  const review = await ReviewServices.findAllReviewsForSeller(id, { sortBy, order, limit, page });
  return review;
};

export const getReviewById = async (req: Request, res: Response) => {
  const review = await ReviewServices.getReviewById(req.params.id);
  return review;
};

export const updateReview = async (req: Request, res: Response) => {
  const review = await ReviewServices.updateReview(req.params.id, req.body);
  return review;
};
