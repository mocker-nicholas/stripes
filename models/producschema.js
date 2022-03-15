import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "products must have a name"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Products must have a price"],
  },

  description: {
    type: String,
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
});

const Product = new mongoose.model("Product", productSchema);

export default Product;
