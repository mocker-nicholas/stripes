import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

// Using ES6 modules requires you to bring in the stripe object on your own. Importing does not do this automatically.
const stripe = new Stripe(`${process.env.STRIPE_PRIVATE_KEY}`);

export const renderCheckout = (req, res) => {
  return res.render("checkout/checkout");
};

export const checkoutSuccess = (req, res) => {
  return res.render("checkout/success");
};

export const createPaymentIntent = async (req, res) => {
  const { products, total } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.json(paymentIntent);
};
