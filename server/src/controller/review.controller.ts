import { Request, Response } from "express";
import * as ReviewServices from "../service/review.service";

export const addReviewForProduct = async (req: Request, res: Response) => {
  const review = await ReviewServices.addReviewForProduct(req.body);
  return review;
};

export const addReviewForSeller = async (req: Request, res: Response) => {
  const review = await ReviewServices.addReviewForSeller(req.body);
  return review;
};

export const getReviewForProduct = async (req: Request, res: Response) => {
  let { sortBy, order, limit, page } = req.query;

  const review = await ReviewServices.findAllReviewsForProduct({ sortBy, order, limit, page });
  return review;
};

export const getReviewsForSeller = async (req: Request, res: Response) => {
  let { sortBy, order, limit, page } = req.query;

  const review = await ReviewServices.findAllReviewsForSeller({ sortBy, order, limit, page });
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
