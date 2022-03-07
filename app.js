import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import session from "express-session";
import flash from "connect-flash";

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
  res.locals.currentUser = req.user;
  next();
});

//////////// Homepage Route ///////////////
app.get("/", (req, res) => {
  return res.render("homeindex");
  //// Change the store name to stripes!
});

import User from "./models/userschema.js";
//////////// User Routes /////////////////
app.get("/user/register", (req, res) => {
  return res.render("users/userregister");
});

app.post("/user/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = await new User({ email, username, password });
    const newUser = await user.save();
    req.flash("success", `${newUser.username}: Account created!`);
    return res.redirect("/user/login");
  } catch (e) {
    // res.json(e.errors);
    req.flash("error", `${e}`);
    return res.redirect("/user/register");
  }
});

app.get("/user/login", (req, res) => {
  return res.render("users/userlogin");
});

app.get("/user/logout", (req, res) => {
  console.log("logged out");
  return;
});

app.get("/user/:id", (req, res) => {
  return res.render("users/usershow");
});

////////////// Shopping Cart ///////////////////
app.get("/cart", (req, res) => {
  return res.render("users/cart");
});

////////////// Product Routes //////////////////
app.get("/products", (req, res) => {
  return res.render("products/productsindex");
});

///////////////// Checkout Route //////////////////
app.get("/checkout", (req, res) => {
  return res.render("checkout/checkout");
});

///////////// Listen for requests //////////////
app.listen(3000, () => {
  return console.log("Listening on Port 3000");
});
