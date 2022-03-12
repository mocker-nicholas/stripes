import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import session from "express-session";
import flash from "connect-flash";
import methodOverride from "method-override";

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

//////////// Homepage Route ///////////////
app.get("/", (req, res) => {
  return res.render("homeindex");
  //// Change the store name to stripes!
});

import User from "./models/userschema.js";
/////////////////////////////////////////////////////////////
///////////////////////// User Routes ///////////////////////
/////////////////////////////////////////////////////////////
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
    req.flash("error", `${e}`);
    return res.redirect("/user/register");
  }
});

app.get("/user/login", (req, res) => {
  return res.render("users/userlogin");
});

app.post("/user/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    req.flash("error", "Invalid username or password");
    return res.redirect("/user/login");
  }
  req.session.user = user;
  return res.redirect("/");
});

app.get("/user/logout", (req, res) => {
  req.session.user = null;
  return res.redirect("/");
});

app.get("/user/:id", (req, res) => {
  return res.render("users/usershow");
});

app.get("/user/:id/update", (req, res) => {
  return res.render("users/userupdate");
});

app.patch("/user/:id", (req, res) => {
  return res.json(req.body);
});

app.delete("/user/:id", async (req, res) => {
  const { username, _id } = req.session.user;
  const user = await User.findOne({ username });
  if (!user) {
    req.flash("error", "Unable to find requested user");
    console.log("no user");
    return res.redirect(`${req.originalUrl.replace("/delete", "")}`);
  }
  const deletedUser = await User.deleteOne({ _id });
  req.session.user = null;
  req.flash("success", "Your account was successfully deleted");
  return res.redirect("/user/register");
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
