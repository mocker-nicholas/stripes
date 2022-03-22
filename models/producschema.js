import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "products must have a name"],
    trim: true,
  },

  imgurl: {
    type: String,
  },

  price: {
    type: Number,
    required: [true, "Products must have a price"],
  },

  category: {
    type: String,
    enum: ["pants", "socks", "sweaters", "shirts", "dresses"],
    required: [true, "please choose a category"],
  },

  description: {
    type: String,
    maxLength: 255,
  },

  smallinstock: {
    type: Number,
    required: true,
  },
  mediuminstock: {
    type: Number,
    required: true,
  },
  largeinstock: {
    type: Number,
    required: true,
  },

  featured: {
    type: Boolean,
    default: false,
  },
});

const Product = new mongoose.model("Product", productSchema);

export default Product;
