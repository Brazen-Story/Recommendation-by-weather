const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const userRoutes = require('./routes/userRoutes');
const ReportRoutes = require('./routes/reportRoutes');

app.use(cors());
app.use(express.json());


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kim0523',
  database: 'byWeather',
  multipleStatements: true,
});

connection.connect();

var user = "SELECT * FROM USER;";
var report = "SELECT * FROM REPORT;"

connection.query(user + report, function (error, results, fields) {
  if (error) throw error;
  //console.log('The solution is: ', results);
});

app.use('/user', userRoutes);
app.use('/report', ReportRoutes);


//connection.end();

app.listen(3001, () => {
  console.log("your server is running on port 3001");
});
