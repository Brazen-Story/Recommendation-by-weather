import { Router } from 'express';
import { weather, getWthrBrkNews } from '../controllers/weatherController';

export const weatherRoutes: Router = Router();

weatherRoutes.post('/raider', weather)
weatherRoutes.get('/WthrWrnInfoService', getWthrBrkNews)