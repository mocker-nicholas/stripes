import express from "express";
import {
  catchAsync,
  isLoggedIn,
  validateUser,
  validateUpdate,
} from "../util/middleware.js";
import {
  registerForm,
  registerUser,
  loginForm,
  loginUser,
  logoutUser,
  showUser,
  updateUser,
  userUpdateForm,
  deleteUser,
} from "../controllers/usercontroller.js";

const router = express.Router();

router
  .route("/register")
  .get(registerForm)
  .post(validateUser, catchAsync(registerUser));

router.route("/login").get(loginForm).post(catchAsync(loginUser));

router.route("/logout").get(logoutUser);

router
  .route("/:id")
  .get(isLoggedIn, catchAsync(showUser))
  .patch(isLoggedIn, validateUpdate, catchAsync(updateUser))
  .delete(isLoggedIn, catchAsync(deleteUser));

router.route("/:id/update").get(isLoggedIn, catchAsync(userUpdateForm));

export default router;