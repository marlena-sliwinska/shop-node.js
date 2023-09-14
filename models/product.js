const { v4: uuidv4 } = require("uuid");

const fs = require("fs");

const path = require("path");

const productsPath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (callback) => {
  fs.readFile(productsPath, (err, fileContent) => {
    if (err) {
      console.log(`Error while reading path ${productsPath}`);
      return;
    }
    let products = [];
    try {
      products = JSON.parse(fileContent);
    } catch (err) {
      console.log("Error during parsing JSON", err);
    }
    callback(products);
  });
};

const saveProductInFile = (product) => {
  getProductsFromFile((products) => {
    products.push(product);
    fs.writeFile(productsPath, JSON.stringify(products), (err) => {
      if (err) {
        console.log(`Something went wrong during saving... ${err}`);
      }
    });
  });
};

class Product {
  constructor(productName, imageUrl, description, price) {
    this.name = productName;
    this.url = imageUrl;
    this.description = description;
    this.price = price;
  }
  save() {
    this.id = uuidv4();
    saveProductInFile(this);
  }
  static fetchProductbyId(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((product) => product.id === id);
      cb(product);
    });
  }

  static fetchAll(render) {
    getProductsFromFile(render);
  }
}

module.exports = Product;
