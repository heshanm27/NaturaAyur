import { Request, Response } from "express";
import {
  addProduct,
  findAllProducts,
  findProductBySellerId,
  patchProduct,
  removeProduct,
  findProductByCategory,
  getAllReviewsForProduct,
  findProductById,
} from "../service/product.service";
import { GetAllProductListInput } from "../schema/product.schema";
import { BadRequestError } from "../errors";
export const addNewProduct = async (req: Request, res: Response) => {
  const product = await addProduct(req.body);

  return res.status(200).json({
    message: "Product Added Successfully",
    product,
  });
};

export const getAllProductList = async (req: Request<{}, {}, {}, GetAllProductListInput["query"]>, res: Response) => {
  let { search, sortBy, order, cat, subCat, limit, page } = req.query;

  //if only pass one sub category then it will be string
  //so convert it to array
  if (typeof subCat === "string") {
    subCat = [subCat];
  }

  //convert sub category to lowercase and trim
  subCat = subCat?.map((item: string) => item.trim().toLowerCase());

  //call service function
  const { products, total } = await findAllProducts({ search, sortBy, cat, subCat, order, limit, page });

  return res.status(200).json({
    message: "Products found Successfully",
    total,
    products,
  });
};

export const getOneProductDetails = async (req: Request, res: Response) => {
  const product = await findProductById(req.body);

  return res.status(200).json({
    message: "Product Added Successfully",
    product,
  });
};

export const getOneSellerProductList = async (req: Request, res: Response) => {
  const products = await findProductBySellerId(req.body);

  return res.status(200).json({
    message: "Product Added Successfully",
    products,
  });
};

export const getProductByCategory = async (req: Request, res: Response) => {
  const products = await findProductByCategory(req.body);

  return res.status(200).json({
    message: "Product Added Successfully",
    products,
  });
};

export const getReviewsForProduct = async (req: Request, res: Response) => {
  const productReviews = await getAllReviewsForProduct(req.body);

  return res.status(200).json({
    message: "Product Added Successfully",
    productReviews,
  });
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updateProduct = await patchProduct(req.body);

    return res.status(200).json({
      message: "Product Updated Successfully",
      updateProduct,
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const deletedProduct = await removeProduct(req.body);

  return res.status(200).json({
    message: "Product Deleted Successfully",
    deletedProduct,
  });
};
