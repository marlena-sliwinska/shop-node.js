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
      console.log(`Error while reading path ${path}`);
      return;
    }
    let products = []       
    try {
        products = JSON.parse(fileContent); 
    } catch (err) {
        console.log("Error during parsing JSON", err);
    }
    callback(products);
    
  });
};

const saveProductInFile = (product) => {
  getProductsFromFile((products)=>{
    products.push(product)
    fs.writeFile(productsPath, JSON.stringify(products), err=>{
      if(err) {
        console.log(`Something went wrong during saving... ${err}`)
        }
      })
 })
}

class Product {
  constructor(productName, imageUrl, description, price) {
    this.name = productName;
    this.url = imageUrl
    this.description = description
    this.price = price
  }
  save() {
    saveProductInFile(this)
  }
  static fetchAll(render) {
    getProductsFromFile(render);
  }
}

module.exports = Product;
