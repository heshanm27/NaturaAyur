import { Request, Response } from "express";

export const getAllOrderList = async (req: Request, res: Response) => {};

export const getOneUserOrderList = async (req: Request, res: Response) => {};

// export const addOrder = async (req: Request, res: Response) => {
//   try {
//     const { userId, products, shippingAddress, paymentMethod, taxPrice, totalPrice } = req.body;
//     const order = await Order.create({
//       userId,
//       products,
//       shippingAddress,
//       paymentMethod,
//       taxPrice,
//       totalPrice,
//     });
//     return res.status(201).json({
//       message: "Order Created Successfully",
//       order,
//     });
//   } catch (e: any) {
//     return res.status(400).json({
//       message: e.message,
//     });
//   }
// };

export const updateOrder = async (req: Request, res: Response) => {};

export const payForOrder = async (req: Request, res: Response) => {};

export const getPaymentDetailsOfOneOrder = async (req: Request, res: Response) => {};
