import mongoose from "mongoose";

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
});

const User = mongoose.model("User", userSchema);

export default User;
