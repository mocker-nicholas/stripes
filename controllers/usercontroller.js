import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userschema.js";

export const registerForm = (req, res) => {
  return res.render("users/userregister");
};

export const registerUser = async (req, res) => {
  const { email, username } = req.body;
  const password = await bcrypt.hash(req.body.password, 12);
  const user = await new User({ email, username, password });
  const newUser = await user.save();
  req.flash("success", `${newUser.username}: Account created!`);
  return res.redirect("/user/login");
};

export const loginForm = (req, res) => {
  return res.render("users/userlogin");
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    req.flash("error", "Invalid username or password");
    return res.redirect("/user/login");
  }
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    req.flash("error", "Invalid username or password");
    return res.redirect("/user/login");
  }
  req.session.user = user;
  return res.redirect("/");
};

export const logoutUser = (req, res) => {
  req.session.user = null;
  req.flash("success", "You have successfully logged out");
  return res.redirect("/user/login");
};

export const emailMe = async (req, res) => {
  if (!req.session.user) {
    req.flash("success", "Sign in to join the club for exclusive deals!");
    return res.redirect("/user/login");
  }
  const id = req.session.user._id;
  const { firstname, lastname, email } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    { $set: { emailme: true } },
    { new: true }
  );
  req.flash(
    "success",
    `Congrats ${firstname}! You will now recieve exclusive offers at ${email}!`
  );
  res.redirect(`/user/${id}`);
};

export const showUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  return res.render("users/usershow", { user });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, {
    billaddress: {
      street: req.body.billstreet,
      street2: req.body.billstreet2,
      country: req.body.billcountry,
      city: req.body.billcity,
      state: req.body.billstate,
      postal: req.body.billpostal,
    },
    shipaddress: {
      street: req.body.shipstreet,
      street2: req.body.shipstreet2,
      country: req.body.shipcountry,
      city: req.body.shipcity,
      state: req.body.shipstate,
      postal: req.body.shippostal,
    },
  });
  req.flash("success", "Your user was updated!");
  return res.redirect(`/user/${id}`);
};

export const userUpdateForm = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  return res.render("users/userupdate", { user });
};

export const deleteUser = async (req, res) => {
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
};
