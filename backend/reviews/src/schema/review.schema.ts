import { isValidObjectId } from "mongoose";
import { object, string, TypeOf, nativeEnum } from "zod";

const RATING_ENUM = {
  1: "BAD",
  2: "NOT_BAD",
  3: "OKAY",
  4: "GRATE",
  5: "EXCELLENT",
};
export const addReviewSchema = object({
  user: string({}).refine((data) => isValidObjectId(data), { message: "UserId must be a valid Id" }),
  product: string({}).refine((data) => isValidObjectId(data), { message: "ProductId must be a valid Id" }),
  rating: nativeEnum(RATING_ENUM),
  comment: string({}).min(2, { message: "Comment must be at least 2 characters" }).max(350, { message: "Comment must be at most 350 characters" }),
});

export type AddReviewInput = TypeOf<typeof addReviewSchema>;

export const updateReviewSchema = addReviewSchema.partial().extend({
  id: string({}).refine((data) => isValidObjectId(data), { message: "ReviewId must be a valid Id" }),
});

export type UpdateReviewInput = TypeOf<typeof updateReviewSchema>;

export const deleteReviewSchema = object({
  id: string({}).refine((data) => isValidObjectId(data), { message: "ReviewId must be a valid Id" }),
});

export type DeleteReviewInput = TypeOf<typeof deleteReviewSchema>;
