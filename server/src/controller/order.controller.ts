import { Request, Response } from "express";
import StripeService from "../util/stripe-service";
import Stripe from "stripe";

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
      cancel_url: `${req.headers.origin}/list`,
      currency: "usd",
      customer_email: user.email,
    };
    const session = await StripeService.checkout.sessions.create(params);
    // console.log(session);
    res.status(200).json({
      url: session.url,
    });
  } catch (err: any) {
    res.status(err.statusCode || 500).json(err.message);
  }
};

export const OrderpayemntHandler = async (req: Request, res: Response) => {
  const sig: any = req.headers["stripe-signature"];

  let event;
  console.log("ket", process.env.PUBLIC_STRIPE_WEBHOOK_SECRET_KEY);
  console.log("body", req.body);
  try {
    event = StripeService.webhooks.constructEvent(req.body, sig, process.env.PUBLIC_STRIPE_WEBHOOK_SECRET_KEY!);
  } catch (err: any) {
    console.log(err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      console.log("paymentIntentSucceeded", paymentIntentSucceeded);
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    case "payment_intent.payment_failed":
      const paymentIntentFailed = event.data.object;
      console.log("paymentIntentFailed", paymentIntentFailed);
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send("suesss");
};

export const updateOrder = async (req: Request, res: Response) => {};

export const getPaymentDetailsOfOneOrder = async (req: Request, res: Response) => {};
