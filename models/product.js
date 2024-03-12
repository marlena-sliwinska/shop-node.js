const Sequelize = require('sequelize'); // class or constructor function - capital letter

// sequalize - an Object Relational Mapping Library

const sequelize = require('../utils/database');
/*
fully configured sequelize environment which does also have 
the connection pool but also all the features of the sequelize
package
*/

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNUll: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNUll: false,
  },
  url: {
    type: Sequelize.STRING,
    allowNUll: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNUll: false,
  },
});

module.exports = Product;
