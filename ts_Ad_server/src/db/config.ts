const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kim0523',
    database: 'ad_byWeather',
    multipleStatements: true,
  });
  
  connection.connect();
  
  export { connection };