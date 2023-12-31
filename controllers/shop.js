const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProduct = (req, res, next) => {
  Product.fetchProductbyId(req.params.productId, (product) => {
    res.render("shop/product-details", {
      pageTitle: product.name,
      path: "/products",
      product,
    });
  });
};

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/products-list", {
      pageTitle: "Products",
      path: "/products",
      products,
    });
  });
};

exports.getShop = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      pageTitle: "Shop",
      path: "/",
      products: products.slice(0, 3),
    });
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
      res.render("shop/cart", { pageTitle: "My cart", path: "/cart", products: cartProducts, price: cart.totalPice });
    });
  });
};

exports.postProductToCart = (req, res, next) => {
  const id = req.body.productId;
  Product.fetchProductbyId(id, (product) => {
    Cart.addProduct(product.id, product.price);
    res.redirect("/cart");
  });
};


exports.cartdeleteItem = (req, res, next)=>{
    const {productId} = req.body
    Product.fetchProductbyId(productId, (product) => {
        Cart.deleteProduct(productId, product.price, ()=>{
          res.redirect('/cart')
        });
      });
}