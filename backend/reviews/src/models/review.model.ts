import mongoose, { Model, ObjectId } from "mongoose";
const { Schema } = mongoose;

export interface IReview {
  _id?: string;
  user: ObjectId;
  product: ObjectId;
  rating: number;
  comment: string;
  seller: ObjectId;
  isEdited: boolean;
}

interface IReviewMethod {}
interface ReviewModel extends Model<IReview, {}, IReviewMethod> {}

const ReviewSchema = new Schema<IReview, ReviewModel, IReviewMethod>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    isEdited: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const Reviews = mongoose.model<IReview, ReviewModel>("Reviews", ReviewSchema);
export default Reviews;
