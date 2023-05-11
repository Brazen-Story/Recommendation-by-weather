const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");

dotenv.config();

app.use(cookieParser());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kim0523',
    database: 'byWeather',
    multipleStatements: true,
  });
  
  connection.connect();
  
  const db = {
    connection: connection,
    user: "SELECT * FROM USER;",
    report: "SELECT * FROM REPORT;"
  };
  
  module.exports = db;