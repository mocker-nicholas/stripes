import express from "express";
import {
  catchAsync,
  isLoggedIn,
  validateUser,
  validateUpdate,
  validateEmailForm,
  isAdmin,
  validateProduct,
} from "../util/middleware.js";
import {
  renderProducts,
  goToCart,
  renderNewProductForm,
  renderProductUpdateForm,
  createNewProduct,
  searchProductCat,
  showProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productcontroller.js";

const router = express.Router();

router.route("/").get(catchAsync(renderProducts));

router.route("/cart").get(goToCart);

router
  .route("/new")
  .get(isAdmin, renderNewProductForm)
  .post(isAdmin, validateProduct, catchAsync(createNewProduct));

router.route("/category/:cat").get(catchAsync(searchProductCat));

router.route("/:id/update").get(isAdmin, catchAsync(renderProductUpdateForm));

router
  .route("/:id")
  .get(catchAsync(showProduct))
  .patch(isAdmin, validateProduct, catchAsync(updateProduct))
  .delete(isAdmin, catchAsync(deleteProduct));

export default router;
