import { Router } from 'express';
import { getFindDust, getWeather, getWthrBrkNews, getDayLightCycle, getYoutubeVideos } from '../controllers/weatherController';

export const weatherRoutes: Router = Router();

weatherRoutes.post('/radar', getWeather);
weatherRoutes.get('/WthrWrnInfo', getWthrBrkNews);
weatherRoutes.get('/finddust', getFindDust);
weatherRoutes.post('/lightCycle', getDayLightCycle);
weatherRoutes.get('/youtubedata', getYoutubeVideos);