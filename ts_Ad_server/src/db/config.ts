const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true,
  });
  
  connection.connect();
  
  export { connection };