import express from "express";
import mongoose from "mongoose";
const app = express();

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/stripeshop");
    console.log("Db connection established!");
  } catch (e) {
    console.log("Connection Error:", e);
  }
};
connectDb();

app.get("/", (req, res) => {
  res.send("Welcome to stripeshop!");
  //// Change the store name to stripes!
});

app.listen(3000, () => {
  console.log("Listening on Port 3000");
});
