const express = require('express');
const router = express.Router();

const adController = require('../controllers/adController');
router.get('/data/:category', adController.getData);
router.post('/count', adController.counting);
router.post('/request', adController.exposed);
module.exports = router;