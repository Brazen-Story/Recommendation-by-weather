import { Router } from 'express';
import { submitReport, getReportsByName, deleteReport, updateReport, managerPage, findtemp  } from '../controllers/reportController';

export const reportRoutes: Router = Router();

reportRoutes.post('/submit', submitReport);
reportRoutes.get('/data/:name', getReportsByName);
reportRoutes.delete('/deleteItem/:name/:temperature/:date', deleteReport);
reportRoutes.put('/update/:name/:temperature/:wind', updateReport);
reportRoutes.get('/manager', managerPage);
reportRoutes.get('/data/:name/:findTemp', findtemp);

