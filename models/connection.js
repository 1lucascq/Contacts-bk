require('dotenv').config();

const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: "us-cdbr-east-05.cleardb.net",
  user: "be99930bd04b0e",
  password: "1dceb3a6",
  database: "heroku_d099a20d88f2c75",
  port: process.env.PORT || 3306
});

module.exports = connection;