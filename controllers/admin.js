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

  req.user
    .getProducts({ where: { id: id } })
    .then((products) => {
      const [product] = products;
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/add-edit-product', {
        pageTitle: 'Edit product',
        path: 'admin/edit-product',
        editing: editMode,
        product,
      });
    })
    .catch((err) => {
      console.log(`Error during fetching product with id ${id}`, err);
    });
};

exports.postAddProduct = (req, res, next) => {
  const { name, url, description, price } = req.body;
  req.user
    .createProduct({
      name: name,
      price: price,
      url: url,
      description: description,
    })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const { id, name, url, description, price } = req.body;
  Product.findByPk(id)
    .then((product) => {
      product.name = name;
      product.price = price;
      product.url = url;
      product.description = description;
      return product.save();
    })
    .then(() => res.redirect('/admin/products'))
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  const { id } = req.body;
  Product.findByPk(id)
    .then((product) => {
      return product.destroy();
    })
    .then(() => res.redirect('/admin/products'))
    .catch((err) => console.log(err));
};

exports.getAllProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then((products) => {
      res.render('admin/products-list', {
        pageTitle: 'Admin products list',
        path: 'admin/products',
        products,
      });
    })
    .catch((err) => {
      console.log(`Error during fetching products`, err);
    });
};
