import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import session from "express-session";
import flash from "connect-flash";
import methodOverride from "method-override";
import bcrypt from "bcrypt";
import ExpressError from "./util/expresserror.js";
import User from "./models/userschema.js";
import Product from "./models/producschema.js";
import userRouter from "./routers/userrouter.js";
import {
  catchAsync,
  validateUser,
  validateUpdate,
  isLoggedIn,
  isAdmin,
  validateProduct,
} from "./util/middleware.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

//////////// Homepage Route ///////////////
app.get("/", (req, res) => {
  return res.render("homeindex");
  //// Change the store name to stripes!
});

////////////// Shopping Cart ///////////////////
app.get("/cart", (req, res) => {
  return res.render("users/cart");
});

////////////// Product Routes //////////////////
app.get(
  "/products",
  catchAsync(async (req, res) => {
    const products = await Product.find({});
    return res.render("products/productsindex", { products });
  })
);

app.get("/products/new", isAdmin, (req, res) => {
  return res.render("products/productscreate");
});

app.post("/products/new", validateProduct, async (req, res) => {
  const product = await new Product(req.body);
  const newProduct = await product.save();
  return res.send(newProduct);
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  return res.send(product);
});

///////////////// Checkout Route //////////////////
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
