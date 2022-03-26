import mongoose from "mongoose";
import Product from "./producschema.js";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Please provide a valid email address"],
    unique: true,
    lowercase: true,
  },

  emailme: {
    type: Boolean,
    default: false,
  },

  isadmin: {
    type: Boolean,
    default: false,
  },

  billaddress: {
    street: String,
    street2: String,
    country: String,
    city: String,
    state: String,
    postal: String,
  },
  shipaddress: {
    street: String,
    street2: String,
    country: String,
    city: String,
    state: String,
    postal: String,
  },

  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const User = mongoose.model("User", userSchema);

const test = async () => {
  const muser = await User.findById("623e6d5148c7b9ce1e4b6c1a").populate(
    "cart"
  );
  console.log(muser);
};

test();

export default User;
