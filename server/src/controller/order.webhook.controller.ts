import { Request, Response } from "express";
import StripeService from "../util/stripe-service";
import { payForOrder, sendOrderRecipet } from "../service/order.service";

export const OrderpayemntHandler = async (req: Request, res: Response) => {
  const sig: any = req.headers["stripe-signature"];

  let event;

  try {
    event = StripeService.webhooks.constructEvent(req.body, sig, process.env.PUBLIC_STRIPE_WEBHOOK_SECRET_KEY!);
    console.log("event", event.type);
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session: any = event.data.object;
      payForOrder({
        isPaid: true,
        orderId: session.metadata.orderId,
        paidAt: new Date(),
        paymentMethod: session.payment_method_types[0],
        paymentResult: {
          id: session.id,
          status: session.payment_status,
          update_time: session.payment_intent,
          email_address: session.customer_email,
        },
        shippingAddress: {
          address: session.customer_details.address.line1,
          city: session.customer_details.address.city,
          country: session.customer_details.address.country,
          postalCode: session.customer_details.address.postal_code,
        },
        shippingPrice: session.shipping_cost.amount_total,
        totalPrice: session.amount_total / 100,
      });
      console.log("session", session);
      break;
    case "payment_intent.created":
      break;
    case "charge.succeeded":
      const charge: any = event.data.object;
      await sendOrderRecipet(charge.billing_details.name, charge.billing_details.email, charge.receipt_url);
      break;
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      console.log("paymentIntentSucceeded", paymentIntentSucceeded);
      break;
    case "payment_intent.payment_failed":
      const paymentIntentFailed = event.data.object;
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.send("suesss");
};
