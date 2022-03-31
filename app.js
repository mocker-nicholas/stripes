import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import session from "express-session";
import flash from "connect-flash";
import methodOverride from "method-override";
import bcrypt from "bcrypt";
import Stripe from "stripe";
import ExpressError from "./util/expresserror.js";
import User from "./models/userschema.js";
import Product from "./models/producschema.js";
import userRouter from "./routers/userrouter.js";
import productsRouter from "./routers/productrouter.js";
import {
  catchAsync,
  validateUser,
  validateUpdate,
  isLoggedIn,
  isAdmin,
  validateProduct,
} from "./util/middleware.js";

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const stripe = new Stripe(`${process.env.STRIPE_PRIVATE_KEY}`);

////////// Connect to the database //////////////
const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/stripeshop");
    console.log("Db connection established!");
  } catch (e) {
    console.log("Connection Error:", e);
  }
};
connectDb();

///////////// app settings ////////////////////
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

////////// request Middlware ///////////////
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "mysuperbadsecret",
    resave: false,
    saveUninitialized: true,
    HttpOnly: true,
    cookie: {
      expires: Date.now() + 1000 * 60 * 60 * 24,
    },
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.message = req.flash("message");
  res.locals.currentUser = req.session.user;
  next();
});

app.use("/user", userRouter);
app.use("/products", productsRouter);

//////////// Homepage Route ///////////////
app.get("/", (req, res) => {
  return res.render("homeindex");
  //// Change the store name to stripes!
});

////////////// Shopping Cart ///////////////////
// If we want the cart on the user you can use this code. I will use local storage for now
// app.get("/cart/:id", async (req, res) => {
//   const id = req.params.id;
//   if (req.session.user) {
//     console.log(id);
//     const product = await Product.findById(id);
//     console.log(product);
//     const user = await User.findByIdAndUpdate(
//       req.session.user._id,
//       { $push: { cart: product } },
//       { new: true }
//     );
//     console.log(user);
//     req.flash("success", "Item Added to cart!");
//     return res.redirect(`/products/${id}`);
//   } else {
//     return res.redirect(`/products/${id}`);
//   }
// });

////////////// Product API Routes //////////////////
app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    return res.json(product);
  } else res.json(null);
});

///////////////// Checkout Route //////////////////
app.post("/create-payment-intent", async (req, res) => {
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
});

app.get("/checkout", (req, res) => {
  return res.render("checkout/checkout");
});

////// Add a catch all for misc errors ///////////
app.all("*", (req, res) => {
  return res.render("pagenotfound");
});

///////////////////// Error Handler ////////////////////
app.use((err, req, res, next) => {
  if (err.code === 11000) {
    err.message = "Username or email is already being used";
  }
  const { statusCode = 500, message = "Not found" } = err;
  // the destructured default wont get passed through to our err object, so set that default manually.
  if (!err.message) err.message = "Oh No! Something went wrong!";
  if (err.name === "CastError") {
    console.log(err.message);
    return res.redirect("/pagenotfound");
  }
  if (req.session.user && req.session.user.isadmin === false) {
    req.flash(
      "error",
      "You do not have the permission needed to perform that action"
    );
    return res.redirect("/user/login");
  }
  return res.status(statusCode).render("error", { err });
});

///////////// Listen for requests //////////////
app.listen(3000, () => {
  return console.log("Listening on Port 3000");
});
