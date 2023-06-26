import { Router } from 'express';
import { getData, counting, exposed, advertisingList } from '../controller/adController';

export const ADrouter: Router = Router();

ADrouter.get('/data/:category', getData);
ADrouter.post('/count', counting);
ADrouter.post('/request', exposed);
ADrouter.get('/manager', advertisingList);
