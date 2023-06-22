import { Router } from 'express';
import { getData, counting, exposed, adlist } from '../controller/adController';


export const ADrouter: Router = Router();

ADrouter.get('/data/:category', getData);
ADrouter.post('/count', counting);
ADrouter.post('/request', exposed);
ADrouter.get('/manager', adlist);
