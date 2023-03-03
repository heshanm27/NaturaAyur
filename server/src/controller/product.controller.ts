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
import { BadRequestError } from "../errors";
export const addNewProduct = async (req: Request, res: Response) => {
  const product = await addProduct(req.body);

  return res.status(200).json({
    message: "Product Added Successfully",
    product,
  });
};
export const getAllProductList = async (req: Request, res: Response) => {
  const products = await findAllProducts(req.body);

  return res.status(200).json({
    message: "Product Added Successfully",
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
