const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProduct = (req, res, next) => {
  const { productId: id } = req.params;
  Product.findByPk(id)
    .then((product) => {
      res.render('shop/product-details', {
        pageTitle: product.name,
        path: '/products',
        product: product,
      });
    })
    .catch((err) => {
      console.log(`Error during fetching product with id ${id}`, err);
    });
};

exports.getAllProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/index', {
        pageTitle: 'Shop',
        path: '/',
        products: products,
      });
    })
    .catch((err) => {
      console.log('Error during fetching all products', err);
    });
};

exports.getShop = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/index', {
        pageTitle: 'Shop',
        path: '/',
        products: products.slice(0, 3),
      });
    })
    .catch((err) => {
      console.log('Error during fetching all products', err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => cart.getProducts())
    .then((products) => {
      res.render('shop/cart', {
        pageTitle: 'My cart',
        path: '/cart',
        products: products,
      });
    })
    .catch((err) => console.log(err));
};

exports.postProductToCart = (req, res, next) => {
  const id = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: id } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        [product] = products;
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(id);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch((err) => console.log(err));
};

exports.cartdeleteItem = (req, res, next) => {
  const { productId } = req.body;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      const [product] = products;
      return product.cartItem.destroy();
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch((err) => console.log(err));
};
