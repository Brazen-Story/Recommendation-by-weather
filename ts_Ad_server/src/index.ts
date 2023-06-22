import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import dotenv from 'dotenv';
import { ADrouter } from './routes/adRoutes';

dotenv.config();

const app = express();
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kim0523',
  database: 'ad_byweather',
  multipleStatements: true,
});

connection.connect();

const Information = 'SELECT * FROM ad_information_tb;';
const Click = 'SELECT * FROM ad_click_tb;';
const Impression = 'SELECT * FROM ad_impression_tb;';

connection.query(Information + Click + Impression, (error: Error) => {
  if (error) throw error;
  //console.log('The solution is: ', results);
});

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
  })
);

app.use('/ad', ADrouter);

app.listen(4001, () => {
  console.log('Your server is running on port 4001');
});
