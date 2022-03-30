import express from "express";
import {
  catchAsync,
  isLoggedIn,
  validateUser,
  validateUpdate,
  validateEmailForm,
} from "../util/middleware.js";
import {} from "../controllers/productcontroller.js";

const router = express.Router();
