import mongoose, { Model, ObjectId } from "mongoose";
const { Schema } = mongoose;

export interface IProduct {
  _id?: string;
  name: string;
  productCode: string;
  description: string;
  brand: string;
  price: number;
  category: string;
  subCategory?: string[];
  images: string[];
  stock: number;
  rating?: number;
  numReviews?: number;
  reviews?: ObjectId[];
  seller: ObjectId;
}

interface IProductMethod {}
interface IProductModel extends Model<IProduct, {}, IProductMethod> {}

const ProductSchema = new Schema<IProduct, IProductModel, IProductMethod>(
  {
    productCode: { type: String, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    category: { type: String, required: true, trim: true, lowercase: true },
    brand: { type: String, required: true },
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

const Product = mongoose.model<IProduct, IProductModel>("Product", ProductSchema);
export default Product;
