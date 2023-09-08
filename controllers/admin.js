const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add new product",
    path: "admin/add-product",
  });
};


exports.postAddProduct = (req, res, next) => {
  const product = new Product(
    req.body.name,
    req.body.url,
    req.body.description,
    req.body.price
  );
  product.save();
  res.redirect("/");
};

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products-list", {
      pageTitle: "Admin products list",
      path: "admin/products",
      products,
    });
  });
};
