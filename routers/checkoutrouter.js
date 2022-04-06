import express from "express";
import { catchAsync } from "../util/middleware.js";
import {
  createPaymentIntent,
  renderCheckout,
  checkoutSuccess,
} from "../controllers/checkoutcontroller.js";
const router = express.Router();

router.route("/").get(renderCheckout);

router.route("/complete").get(checkoutSuccess);

router.route("/create-payment-intent").post(catchAsync(createPaymentIntent));

export default router;
