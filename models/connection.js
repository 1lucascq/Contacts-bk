require('dotenv').config();

const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: "us-cdbr-east-05.cleardb.net",
  user: "be99930bd04b0e",
  password: "1dceb3a6",
  database: "heroku_d099a20d88f2c75",
  port: process.env.DB_PORT
});

// host: process.env.HOST,
//   user: process.env.DB_USER,
//   password: process.env.PASSWORD,
//   database: process.env.DB,
//   port: process.env.DB_PORT
module.exports = connection;