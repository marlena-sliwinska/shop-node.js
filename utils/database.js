const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-shop', 'root', 'inBalanceSQL', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
