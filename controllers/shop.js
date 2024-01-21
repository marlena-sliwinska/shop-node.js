const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProduct = (req, res, next) => {
  const { productId: id } = req.params;
  Product.fetchProductbyId(id)
    .then(([product]) => {
      res.render('shop/product-details', {
        pageTitle: product.name,
        path: '/products',
        product: product[0],
      });
    })
    .catch((err) => {
      console.log(`Error during fetching product with id ${id}`, err);
    });
};

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([products]) => {
      res.render('shop/products-list', {
        pageTitle: 'Products',
        path: '/products',
        products,
      });
    })
    .catch((err) => {
      console.log('Error during fetching all products', err);
    });
};

exports.getShop = (req, res, next) => {
  Product.fetchAll()
    .then(([products, fieldData]) => {
      return products;
    })
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
  Cart.fetchCart((cart) => {
    const cartProducts = [];
    Product.fetchAll((allProducts) => {
      for (product of allProducts) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({
            productData: product,
            quantity: cartProductData.quantity,
          });
        }
      }
      res.render('shop/cart', {
        pageTitle: 'My cart',
        path: '/cart',
        products: cartProducts,
        price: cart.totalPice,
      });
    });
  });
};

exports.postProductToCart = (req, res, next) => {
  const id = req.body.productId;
  Product.fetchProductbyId(id, (product) => {
    Cart.addProduct(product.id, product.price);
    res.redirect('/cart');
  });
};

exports.cartdeleteItem = (req, res, next) => {
  const { productId } = req.body;
  Product.fetchProductbyId(productId, (product) => {
    Cart.deleteProduct(productId, product.price, () => {
      res.redirect('/cart');
    });
  });
};
