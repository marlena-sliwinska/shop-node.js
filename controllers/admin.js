const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-edit-product', {
    pageTitle: 'Add new product',
    path: 'admin/add-product',
    editing: false,
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }

  const id = req.params.productId;
  Product.fetchProductbyId(id, (product) => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/add-edit-product', {
      pageTitle: 'Edit product',
      path: 'admin/edit-product',
      editing: editMode,
      product,
    });
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(
    null,
    req.body.name,
    req.body.url,
    req.body.description,
    req.body.price
  );
  product
    .save()
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log('Error during saving new product', err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const { id, name, url, description, price } = req.body;
  const product = new Product(id, name, url, description, price);
  product.save();
  res.redirect('/admin/products');
};

exports.deleteProduct = (req, res, next) => {
  const { id } = req.body;
  Product.delete(id);
  res.redirect('/admin/products');
};

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products-list', {
      pageTitle: 'Admin products list',
      path: 'admin/products',
      products,
    });
  });
};
