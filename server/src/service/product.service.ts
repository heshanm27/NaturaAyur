import { AddProductInput, UpdateProductInput } from "../schema/product.schema";
import ProductSchema, { IProduct } from "../models/product.model";
import { BadRequestError } from "../errors";

interface IFilters {
  search?: string;
  sortBy?: any;
  order?: any;
  limit?: any;
  page?: any;
  cat?: string;
  subCat?: string[];
}

export async function addProduct(input: IProduct) {
  const product = await ProductSchema.create(input);
  return product;
}

export async function patchProduct(id: string, { subCategory, reviews, ...input }: UpdateProductInput["body"]) {
  const updateProduct = await ProductSchema.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      $addToSet: { subCategory, reviews },
      $set: { ...input },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updateProduct) {
    throw new BadRequestError("Product not found");
  }

  return updateProduct;
}

export async function removeProduct(id: string) {
  const deletedProduct = await ProductSchema.findByIdAndDelete(id);

  if (!deletedProduct) {
    throw new BadRequestError("Product not found");
  }

  return deletedProduct;
}

export async function findAllProducts({ search = "", sortBy = "createdAt", order = "-1", limit = "2", page = "1", cat, subCat = [] }: IFilters): Promise<{
  products: any;
  total: number;
  maxProductsPrice: number;
  minProductsPrice: number;
}> {
  //default filters
  const defaultFilters: any = {
    name: { $regex: search, $options: "i" },
  };

  //if category is present then add it to the filter
  if (cat) {
    defaultFilters["category"] = cat.toLowerCase();
  }

  //if sub category is present then add it to the filter
  if (subCat.length > 0) {
    defaultFilters["subCategory"] = { $in: subCat };
  }

  //find all products
  const products = await ProductSchema.find(defaultFilters)
    .sort({
      [sortBy]: order,
    })
    .limit(limit)
    .skip(limit * (page - 1));

  //find count for matching products
  const totalDocCount = await ProductSchema.countDocuments(defaultFilters)
    .sort({
      [sortBy]: order,
    })
    .count();
  const total = Math.ceil(totalDocCount / limit);
  const maxProduct = await ProductSchema.findOne()
    .sort({ price: -1 }) // Sort by "price" field in descending order to get maximum value
    .select("price") // Select only the "price" field
    .exec();

  const minProduct = await ProductSchema.findOne()
    .sort({ price: 1 }) // Sort by "price" field in ascending order to get minimum value
    .select("price") // Select only the "price" field
    .exec();
  const maxProductsPrice = maxProduct ? maxProduct.price : 0;
  const minProductsPrice = minProduct ? minProduct.price : 0;

  return { products, total, maxProductsPrice, minProductsPrice };
}

export async function findProductById(id: string) {
  const product = await ProductSchema.findById(id);
  if (!product) {
    throw new BadRequestError("Product not found");
  }

  return product;
}
export async function findProductBySellerId(id: string) {
  const products = await ProductSchema.find({ sellerId: id });
  if (!products) {
    throw new BadRequestError("Products not found");
  }
  return products;
}

export async function getAllReviewsForProduct(id: string) {
  const produtReviews = await ProductSchema.findById(id).populate("reviews");

  if (!produtReviews) {
    throw new BadRequestError("Product reviews not found");
  }

  return produtReviews;
}
