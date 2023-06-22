import express from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(cookieParser());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kim0523',
  database: 'byWeather',
  multipleStatements: true,
});

connection.connect();

export { connection };
