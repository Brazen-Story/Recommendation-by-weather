const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require("cors");

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