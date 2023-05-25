const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require('./routes/userRoutes');
const ReportRoutes = require('./routes/reportRoutes');
const dotenv = require('dotenv');
const http = require('http');
const socketIO = require('./socket'); // Import the socket.io configuration file

dotenv.config();

app.use(express.json());
app.use(cookieParser());
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
  database: 'byWeather',
  multipleStatements: true,
});

connection.connect();

var user = "SELECT * FROM USER;";
var report = "SELECT * FROM REPORT;"

connection.query(user + report, function (error, results, fields) {
  if (error) throw error;
});

app.use('/user', userRoutes);
app.use('/report', ReportRoutes);

//connection.end();

// app.listen(3001, () => {
//   console.log("your server is running on port 3001");
// });

const server = http.createServer(app);

// Set up socket.io
socketIO.init(server);

const port = 3001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});