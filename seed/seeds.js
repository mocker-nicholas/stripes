import Product from "../models/producschema.js";
import mongoose from "mongoose";

async function connectDb() {
  try {
    await mongoose.connect("mongodb://localhost:27017/stripeshop");
    return console.log("DATABASE CONNECTED");
  } catch (e) {
    return console.log("CONNECTION ERROR", e);
  }
}

const pickRand = (arr) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};
const name = ["pants", "shirts", "socks", "sweaters"];
const price = [1.0, 2.0, 234.0, 7.34, 89.75, 100, 15.0];
const imgurl = [
  "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFudHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1624378441864-6eda7eac51cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHBhbnRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1545205597-ad550b48864f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHN3ZWF0ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1580331451062-99ff652288d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c3dlYXRlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c2hpcnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHNoaXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHNoaXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHNoaXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1635615993248-2acce2b0df8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHNvY2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1632691085121-fc6eb35d5665?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHNvY2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1601743023287-5b0ed4675759?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHN3ZWF0ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHNoaXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
];
const category = ["pants", "shirts", "socks", "sweaters"];
const description = [
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, libero.",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga modi ut corporis id possimus aperiam illum autem consequuntur ab animi.",
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias temporibus iusto consequuntur asperiores, accusamus facere dolores ex rem sapiente voluptate quo amet delectus illum necessitatibus natus, unde totam cum nihil.",
];

const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const bool = [true, false, false, false, false, false];

const createProducts = async (prodnum) => {
  await connectDb();
  for (let i = 0; i < prodnum; i++) {
    const product = await new Product({
      name: pickRand(name),
      imgurl: pickRand(imgurl),
      price: pickRand(price),
      category: pickRand(category),
      description: pickRand(description),
      smallinstock: pickRand(num),
      mediuminstock: pickRand(num),
      largeinstock: pickRand(num),
      featured: pickRand(bool),
    });
    const newProduct = await product.save();
  }
  await mongoose.connection.close();
  return console.log("CONNECTION CLOSED");
};

createProducts(50);
