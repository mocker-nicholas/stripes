import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,

  billaddress: [
    {
      street: String,
      street2: String,
      country: String,
      city: String,
      state: String,
      postal: String,
    },
  ],
  shipaddress: [
    {
      street: String,
      street2: String,
      country: String,
      city: String,
      state: String,
      postal: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
