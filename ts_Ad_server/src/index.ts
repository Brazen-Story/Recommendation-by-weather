import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import dotenv from 'dotenv';
import { ADrouter } from './routes/adRoutes';
import { connection } from './db/config';

dotenv.config();

const app = express();

const Information = 'SELECT * FROM ad_information_tb;';
const Click = 'SELECT * FROM ad_click_tb;';
const Impression = 'SELECT * FROM ad_impression_tb;';

connection.query(Information + Click + Impression, (error: Error) => {
  if (error) throw error;
});

app.use(express.json());
app.use(
  cors({
    origin: `http://localhost:${process.env.ORIGIN_PORT}`,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
  })
);

app.use('/ad', ADrouter);

app.listen(process.env.PORT, () => {
  console.log('광고 서버 연결 완료');
});
