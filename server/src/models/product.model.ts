import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    category: { type: String, required: true, trim: true, lowercase: true },
    subCategory: {
      type: [String],
      required: true,
      set: function (arr: string[]) {
        return arr.map(function (str: string) {
          return str.trim().toLowerCase();
        });
      },
    },
    images: { type: [String], required: true, trim: true },
    stock: { type: Number, required: true, default: 0 },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    reviews: { type: [mongoose.Schema.Types.ObjectId], ref: "Reviews" },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
