import mongoose, { Model } from "mongoose";
const { Schema } = mongoose;

export interface ICategory {
  _id?: string;
  name: string;
  subCategory: string[];
}

interface ICategoryMethod {}
interface ICategoryModel extends Model<ICategory, {}, ICategoryMethod> {}

const categorySchema = new Schema<ICategory, ICategoryModel, ICategoryMethod>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    subCategory: {
      type: [String],
      set: function (arr: string[]) {
        return arr.map(function (str: string) {
          return str.trim().toLowerCase();
        });
      },
    },
  },
  { timestamps: true }
);

const Category = mongoose.model<ICategory, ICategoryModel>("Category", categorySchema);
export default Category;
