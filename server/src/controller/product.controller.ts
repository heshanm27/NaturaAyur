import { Request, Response } from "express";
import {
  addProduct,
  findAllProducts,
  findProductBySellerId,
  patchProduct,
  removeProduct,
  getAllReviewsForProduct,
  findProductById,
} from "../service/product.service";
import { GetAllProductListInput, AddProductInput, UpdateProductInput, DefaultParamsInput } from "../schema/product.schema";

export const addNewProduct = async (req: Request<{}, {}, AddProductInput["body"]>, res: Response) => {
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

export const getOneProductDetails = async (req: Request<DefaultParamsInput["params"]>, res: Response) => {
  const { id } = req.params;

  const product = await findProductById(id);

  return res.status(200).json({
    message: "Product found Successfully",
    product,
  });
};

export const getOneSellerProductList = async (req: Request<DefaultParamsInput["params"]>, res: Response) => {
  const products = await findProductBySellerId(req.body);

  return res.status(200).json({
    message: "Sellet found Successfully",
    products,
  });
};

export const getReviewsForProduct = async (req: Request<DefaultParamsInput["params"]>, res: Response) => {
  const productReviews = await getAllReviewsForProduct(req.body);

  return res.status(200).json({
    message: "Reviews found Successfully",
    productReviews,
  });
};

export const updateProduct = async (req: Request<UpdateProductInput["params"], {}, UpdateProductInput["body"]>, res: Response) => {
  const { id } = req.params;
  const updateProduct = await patchProduct(id, req.body);

  return res.status(200).json({
    message: "Product Updated Successfully",
    updateProduct,
  });
};

export const deleteProduct = async (req: Request<DefaultParamsInput["params"]>, res: Response) => {
  const { id } = req.params;
  const deletedProduct = await removeProduct(id);

  return res.status(200).json({
    message: "Product Deleted Successfully",
    deletedProduct,
  });
};
