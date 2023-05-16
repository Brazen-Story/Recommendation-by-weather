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
  
  const db = {
    connection: connection,
    Information: "SELECT * FROM ad_information_tb;",
    Click: "SELECT * FROM ad_click_tb;",
    Impression: "SELECT * FROM ad_impression_tb",
  };
  
  module.exports = db;