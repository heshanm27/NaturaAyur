import { Request, Response } from "express";
import StripeService from "../util/stripe-service";
import Stripe from "stripe";

export const getAllOrderList = async (req: Request, res: Response) => {};

export const getOneUserOrderList = async (req: Request, res: Response) => {};

export const addOrder = async (req: Request, res: Response) => {
  try {
    const user: any = req.user;
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
      success_url: `${req.headers.origin}/list`,
      cancel_url: `${req.headers.origin}/list`,
      currency: "usd",
      customer_email: user.email,
    };
    const session = await StripeService.checkout.sessions.create(params);
    console.log(session);
    res.status(200).json({
      url: session.url,
    });
    // res.status(200).json({
    //   message: "sdsdsd",
    // });
  } catch (err: any) {
    res.status(err.statusCode || 500).json(err.message);
  }
};

export const updateOrder = async (req: Request, res: Response) => {};

export const payForOrder = async (req: Request, res: Response) => {};

export const getPaymentDetailsOfOneOrder = async (req: Request, res: Response) => {};
