import Product from "../models/producschema.js";

export const renderProducts = async (req, res) => {
  const cat = null;
  const { page = 1, limit = 20 } = req.query;
  const products = await Product.find({})
    .limit(limit * 1)
    .skip((page - 1) * limit);
  return res.render("products/productsindex", { products, cat, page });
};

export const goToCart = (req, res) => {
  return res.render("products/productscart");
};

export const renderNewProductForm = (req, res) => {
  return res.render("products/productsnew");
};

export const createNewProduct = async (req, res) => {
  const newProduct = await new Product(req.body);
  const product = await newProduct.save();
  return res.render("products/productsshow", { product });
};

export const renderProductUpdateForm = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  return res.render("products/productsupdate", { product });
};

export const searchProductCat = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const { cat } = req.params;
  const products = await Product.find({ category: cat })
    .limit(limit * 1)
    .skip((page - 1) * limit);
  return res.render("products/productsindex", { products, cat, page });
};

export const showProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return res.redirect("/pagenotfound");
  }
  return res.render("products/productsshow", { product });
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  req.flash("success", `${product.name} was updated!`);
  return res.redirect(`/products/${id}`);
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndRemove(id);
  req.flash("success", `${product.name} has been deleted`);
  res.redirect("/products");
};
