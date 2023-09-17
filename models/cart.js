const fs = require("fs");
const path = require("path");
const Product = require("./product");

const cartPath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(cartPath, (err, fileContent) => {
      if (err) {
        console.log(`Error while reading path ${cartPath}`);
        return;
      }
      let cart = { products: [], totalPice: 0 };
      try {
        cart = JSON.parse(fileContent);
      } catch (err) {
        console.log(`Error during parsing JSON from path ${cartPath}`, err);
      }

      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.quantity = updatedProduct.quantity + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        cart.products = [...cart.products, { id, quantity: 1 }];
      }

      cart.totalPice = Number((Number(cart.totalPice) + Number(productPrice)).toFixed(2))

      fs.writeFile(cartPath, JSON.stringify(cart), (err) => {
        console.log(`Something went wrong during saving cart ${err}`);
      });
    });
  }

  static deleteProduct(id, price, cb) {
    fs.readFile(cartPath, (err, fileContent) => {
      if (err) {
        console.log(`Error while reading path ${cartPath}`);
        return;
      }
      let cart = { products: [], totalPice: 0 };
      try {
        cart = JSON.parse(fileContent);
      } catch (err) {
        console.log(`Error during parsing JSON from path ${cartPath}`, err);
      }
      const updatedCart = {...cart}
      const product = updatedCart.products.find(p=>p.id===id)
      if(!product) {
        return
      }
      const { quantity } = product
      updatedCart.products = updatedCart.products.filter(prod=>prod.id!==id)
      updatedCart.totalPice = Number((updatedCart.totalPice - price * quantity).toFixed(2))

      fs.writeFile(cartPath, JSON.stringify(updatedCart), (err) => {
        console.log(`Something went wrong during saving cart ${err}`);
      });
      cb()
    });

  }

  static fetchCart(callback) {
    fs.readFile(cartPath, (err, fileContent) => {
      if (err) {
        console.log(`Error while reading path ${cartPath}`);
        return;
      }
      let cart = { products: [], totalPice: 0 };
      try {
        cart = JSON.parse(fileContent);
      } catch (err) {
        console.log(`Error during parsing JSON from path ${cartPath}`, err);
      }
      callback(cart);
    });
  }
};
