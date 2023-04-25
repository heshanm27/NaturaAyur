import { Request, Response } from "express";
import StripeService from "../util/stripe-service";
import Stripe from "stripe";
import * as OrderService from "../service/order.service";
import { gernateRandomUniqueCode } from "../util/genrate-product-code";
import { BadRequestError } from "../errors";
import { findProductById } from "../service/product.service";

export const getAllOrderList = async (req: Request, res: Response) => {
  try {
    const orders = await StripeService.checkout.sessions.list();
    res.status(200).json({
      orders,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOneUserOrderList = async (req: Request, res: Response) => {};

export const addOrder = async (req: Request, res: Response) => {
  try {
    const user: any = req.user;
    console.log(req.body);
    const PlacedOrder: any = await OrderService.addOrder({
      user: user._id,
      orderItems: req.body,
      orderId: gernateRandomUniqueCode("ORD"),
    });

    for (let item of req.body) {
      const product = await findProductById(item.product, item.quantity);
    }

    const params: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      shipping_options: [
        {
          shipping_rate: "shr_1MzNh5Cdnivczi88DrNemou2",
        },
        {
          shipping_rate: "shr_1MzNtUCdnivczi88qMNcEkQu",
        },
      ],
      billing_address_collection: "required",
      line_items: req.body.map((item: any) => {
        console.log(item.image);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              images: [item.image],
            },
            unit_amount: Math.round(item.price * 100),
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      success_url: `${req.headers.origin}/user/payment/success`,
      cancel_url: `${req.headers.origin}/user/payment/cancel`,
      currency: "usd",
      customer_email: user.email,
      metadata: {
        order: "order",
        order_id: PlacedOrder._id,
        orderId: PlacedOrder.orderId,
      },
    };
    const session = await StripeService.checkout.sessions.create(params);
    res.status(200).json({
      url: session.url,
      orderId: PlacedOrder._id,
    });
  } catch (err: any) {
    res.status(err.statusCode || 400).json(err.message);
  }
};

export const updateOrder = async (req: Request, res: Response) => {};

export const getPaymentDetailsOfOneOrder = async (req: Request, res: Response) => {};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    console.log(req.params.id);
    const orderId = req.params.id;
    const order = await OrderService.deleteOrder(orderId);
    res.status(200).json({
      message: "Order deleted",
    });
  } catch (error: any) {
    console.log(error);
    throw new BadRequestError(error.message);
  }
};

export const getRecentOrderList = async (req: Request, res: Response) => {
  try {
    const orders = await OrderService.findRecentOrders();
    res.status(200).json(orders);
  } catch (error: any) {
    throw new BadRequestError(error.message);
  }
};

export const getOneOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;
    const order = await OrderService.findOrderById(orderId);
    res.status(200).json(order);
  } catch (error: any) {
    throw new BadRequestError(error.message);
  }
};

export const getOrderHistory = async (req: Request, res: Response) => {
  try {
    const orders = await OrderService.findOrdersHistory();
    res.status(200).json(orders);
  } catch (error: any) {
    throw new BadRequestError(error.message);
  }
};

export const getLiveOrder = async (req: Request, res: Response) => {
  try {
    console.log("live order");
    const orders = await OrderService.findLiveOrders();
    res.status(200).json(orders);
  } catch (error: any) {
    throw new BadRequestError(error.message);
  }
};
