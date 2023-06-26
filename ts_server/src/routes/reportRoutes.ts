import { Router } from 'express';
import { getReportsByName, deleteReport, updateReport, managerPage, findtemp, saveReport  } from '../controllers/reportController';

export const reportRoutes: Router = Router();

reportRoutes.post('/submit', saveReport);
reportRoutes.get('/data/:name', getReportsByName);
reportRoutes.delete('/deleteItem/:name/:temperature/:date', deleteReport);
reportRoutes.put('/update/:name/:temperature/:wind', updateReport);
reportRoutes.get('/manager', managerPage);
reportRoutes.get('/data/:name/:findTemp', findtemp);

