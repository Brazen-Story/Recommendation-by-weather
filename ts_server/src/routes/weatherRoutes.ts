import { Router } from 'express';
import { getFindDust, getWeather, getWthrBrkNews, getDayLightCycle } from '../controllers/weatherController';

export const weatherRoutes: Router = Router();

weatherRoutes.post('/raider', getWeather);
weatherRoutes.get('/WthrWrnInfoService', getWthrBrkNews);
weatherRoutes.get('/finddust', getFindDust);
weatherRoutes.post('/lightCycle', getDayLightCycle);