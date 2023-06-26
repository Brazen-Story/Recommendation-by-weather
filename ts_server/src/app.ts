import express from 'express';
import mysql from 'mysql';
import cookieParser, { CookieParseOptions } from 'cookie-parser';
import cors from 'cors';
import { userRoutes } from './routes/userRoutes';
import { reportRoutes } from './routes/reportRoutes';
import dotenv from 'dotenv';
import http from 'http';
import { connection } from './db/config';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser() as express.RequestHandler); // Specify type as express.RequestHandler
app.use(
    cors({
      origin: `http://localhost:${process.env.ORIGIN_PORT}`,
      methods: ['GET', 'POST', 'DELETE', 'PUT'],
      credentials: true,
    })
  );

const user = 'SELECT * FROM USER';
const report = 'SELECT * FROM REPORT';

connection.query(user, function (error: Error, userResults: string) {
  if (error) throw error;
  console.log('good User');
});

connection.query(report, function (error: Error, reportResults: string) {
  if (error) throw error;
  console.log('good Report');
});

app.use('/user', userRoutes);
app.use('/report', reportRoutes);

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});