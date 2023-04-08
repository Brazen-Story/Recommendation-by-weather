const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.post('/submit', reportController.submitReport);
router.get('/data/:name', reportController.getReportsByName);
router.delete('/deleteItem/:name/:temperature/:date', reportController.deleteReport);
router.put('/update/:name/:temperature/:wind', reportController.updateReport);
router.get('/manager',reportController.managerPage);
router.get('/data:name/:findTemp',reportController.findtemp)

module.exports = router;