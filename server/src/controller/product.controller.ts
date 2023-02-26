import { Request, Response } from "express";

export const getAllProductList = async (req: Request, res: Response) => {};

export const getOneUserProductList = async (req: Request, res: Response) => {};

export const addProduct = async (req: Request, res: Response) => {
  const { name, description, price, quantity, category, subCategory, images } = req.body;
  console.log(name, description, price, quantity, category, subCategory, images);
  return res.status(200).json({
    message: "Product Added Successfully",
  });
};

export const updateProduct = async (req: Request, res: Response) => {};

export const payForProduct = async (req: Request, res: Response) => {};

export const getPaymentDetailsOfOneProduct = async (req: Request, res: Response) => {};
