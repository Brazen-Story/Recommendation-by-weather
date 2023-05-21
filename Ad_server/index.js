const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const dotenv = require('dotenv');
const adRoutes = require('./routes/adRoutes')

dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kim0523',
  database: 'ad_byweather',
  multipleStatements: true,
});

connection.connect();

var Information = "SELECT * FROM ad_information_tb;";
var Click = "SELECT * FROM ad_click_tb;"
var Impression = "SELECT * FROM ad_impression_tb"

connection.query(Information + Click + Impression, function (error, results, fields) {
  if (error) throw error;
  //console.log('The solution is: ', results);
});

app.use('/ad', adRoutes);

//connection.end();

app.listen(4001, () => {
  console.log("your server is running on port 4001");
});
