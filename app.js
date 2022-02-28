import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
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

//////////// Homepage Route ///////////////
app.get("/", (req, res) => {
  return res.render("landing");
  //// Change the store name to stripes!
});

//////////// User Routes /////////////////
app.get("/user/register", (req, res) => {
  return res.render("users/userregister");
});

app.get("/user/login", (req, res) => {
  return res.render("users/userlogin");
});

///////////// Listen for requests //////////////
app.listen(3000, () => {
  console.log("Listening on Port 3000");
});
