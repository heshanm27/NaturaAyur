import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    subCategory: { type: [String], required: true },
    images: { type: [String], required: true },
    stock: { type: Number, required: true },
    rating: { type: Number },
    numReviews: { type: Number },
    reviews: { type: [mongoose.Schema.Types.ObjectId], ref: "Reviews" },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
