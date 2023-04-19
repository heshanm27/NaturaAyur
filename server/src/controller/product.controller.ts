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
import { GetAllProductListInput } from "../schema/product.schema";
import { gernateRandomUniqueCode } from "../util/genrate-product-code";

export const addNewProduct = async (req: Request, res: Response) => {
  let imgArr: string[] = [];
  const imageFiles: any = req.files;
  const user: any = req.user;

  // Check if image files exist
  if (imageFiles?.length > 0) {
    imageFiles?.map((item: any) => {
      imgArr.push(item.location);
    });
  } else {
    imgArr.push("https://ds-nature-ayur.s3.ap-southeast-1.amazonaws.com/defaultImages/No-Image-Placeholder.svg.png");
  }
  console.log(req.body.subCategory);
  const productBody = {
    name: req.body.name,
    price: Number(req.body.price),
    description: req.body.description,
    category: req.body.category,
    subCategory: req.body.subCategory,
    images: imgArr,
    stock: req.body.stock,
    productCode: gernateRandomUniqueCode("PD"),
    seller: user._id,
    brand: req.body.brand,
  };
  const product = await addProduct(productBody);
  return res.status(200).json({
    message: "Product Added Successfully",
    product,
  });
};

export const getAllProductList = async (req: Request<{}, {}, {}, GetAllProductListInput["query"]>, res: Response) => {
  let { search, sortBy, order, cat, subCat, limit, page } = req.query;

  console.log(search, sortBy, order, cat, subCat, limit, page);

  //if only pass one sub category then it will be string
  //so convert it to array
  if (typeof subCat === "string") {
    subCat = [subCat];
  }

  //convert sub category to lowercase and trim
  subCat = subCat?.map((item: string) => item.trim().toLowerCase());

  //call service function
  const { products, total, maxProductsPrice, minProductsPrice } = await findAllProducts({ search, sortBy, cat, subCat, order, limit, page });

  return res.status(200).json({
    message: "Products found Successfully",
    total,
    products,
    maxProductsPrice,
    minProductsPrice,
  });
};

export const getOneProductDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await findProductById(id);
  return res.status(200).json({
    message: "Product found Successfully",
    product,
  });
};

export const getOneSellerProductList = async (req: Request, res: Response) => {
  const user: any = req?.user;
  console.log("called");
  console.log(user._id);
  const products = await findProductBySellerId(user._id);

  return res.status(200).json({
    message: "Sellet found Successfully",
    products,
  });
};

export const getReviewsForProduct = async (req: Request, res: Response) => {
  const productReviews = await getAllReviewsForProduct(req.body);

  return res.status(200).json({
    message: "Reviews found Successfully",
    productReviews,
  });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateProduct = await patchProduct(id, req.body);

  return res.status(200).json({
    message: "Product Updated Successfully",
    updateProduct,
  });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedProduct = await removeProduct(id);

  return res.status(200).json({
    message: "Product Deleted Successfully",
    deletedProduct,
  });
};
