import Product from "../models/producschema.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const prodUrl = process.env.DB_URL;
const devUrl = "mongodb://localhost:27017/stripeshop";

async function connectDb() {
  try {
    await mongoose.connect(prodUrl);
    return console.log("DATABASE CONNECTED");
  } catch (e) {
    return console.log("CONNECTION ERROR", e);
  }
}

const pickRand = (arr) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};
const name = ["pants", "shirts", "socks", "sweaters", "dresses"];
const price = [
  1.0, 2.0, 234.0, 7.34, 89.75, 100, 15.0, 12.23, 63.78, 45.99, 12.99, 16.99,
  29.99, 30.99, 49.99, 55.55, 66.65, 42.75,
];
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
  "https://images.unsplash.com/flagged/photo-1585052201332-b8c0ce30972f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJlc3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZHJlc3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZHJlc3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZHJlc3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGFudHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1551854838-212c50b4c184?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGFudHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1564379976409-79bd0786fff1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c29ja3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1582966772680-860e372bb558?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c29ja3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1608984361471-ff566593088f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHN3ZWF0ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/flagged/photo-1574874897534-036671407eda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHN3ZWF0ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1608234807905-4466023792f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvdXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
];
const category = ["pants", "shirts", "socks", "sweaters", "dresses"];
const description = [
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, libero.",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga modi ut corporis id possimus aperiam illum autem consequuntur ab animi.",
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias temporibus iusto consequuntur asperiores, accusamus facere dolores ex rem sapiente voluptate quo amet delectus illum necessitatibus natus, unde totam cum nihil.",
];

const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const bool = [true, false, false, false, false, false];

// Local Product creation
const createProducts = async (prodnum) => {
  await connectDb();
  await Product.deleteMany({});
  for (let i = 0; i < prodnum; i++) {
    const prodName = pickRand(name);
    const product = await new Product({
      name: prodName,
      imgurl: pickRand(imgurl),
      price: pickRand(price),
      category: prodName,
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

createProducts(200);
