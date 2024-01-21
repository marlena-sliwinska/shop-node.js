const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-shop',
  // todo:
  password: 'inBalanceSQL',
});

module.exports = pool.promise();
