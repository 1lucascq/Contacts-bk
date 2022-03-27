import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// export default mysql.createPool({
//   host: process.env.DB_HOSTNAME,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   port: Number(process.env.DB_PORT)

// });


export default mysql.createPool({

  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT)

});

// const connection = mysql.createPool({
  // host: "us-cdbr-east-05.cleardb.net",
  // user: "be99930bd04b0e",
  // password: "1dceb3a6",
  // database: "heroku_d099a20d88f2c75",
  // port: Number(process.env.DB_PORT)
// });

// module.exports = connection;