import Stripe from "stripe";
const stripe = new Stripe(process.env.PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
  typescript: true,
});

export default stripe;
