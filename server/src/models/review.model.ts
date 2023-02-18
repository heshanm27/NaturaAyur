import mongoose from "mongoose";
const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    isDeleted: { type: Boolean, required: true, default: false },
    isEdited: { type: Boolean, required: true, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

const Reviews = mongoose.model("Reviews", ReviewSchema);
export default Reviews;
