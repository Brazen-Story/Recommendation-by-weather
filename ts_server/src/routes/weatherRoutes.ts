import { Router } from 'express';
import { getFindDust, getWeather, getWthrBrkNews } from '../controllers/weatherController';

export const weatherRoutes: Router = Router();

weatherRoutes.post('/raider', getWeather);
weatherRoutes.get('/WthrWrnInfoService', getWthrBrkNews);
weatherRoutes.get('/finddust', getFindDust);