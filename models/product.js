const db = require('../utils/database');

class Product {
  constructor(id, productName, imageUrl, description, price) {
    this.id = id;
    this.name = productName;
    this.url = imageUrl;
    this.description = description;
    this.price = price;
  }
  save() {
    // sql injection issue - safety
    return db.execute(
      'INSERT INTO products (name, price, url, description) VALUES (?, ?, ?, ?)',
      [this.name, this.price, this.url, this.description]
    );
  }
  static delete(id) {}

  static fetchProductbyId(id) {
    return db.execute('SELECT * FROM products WHERE products.id=?', [id]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }
}

module.exports = Product;
