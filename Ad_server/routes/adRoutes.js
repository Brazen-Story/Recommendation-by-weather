const express = require('express');
const router = express.Router();

const adController = require('../controllers/adController');
router.get('/data/:category', adController.getData);


module.exports = router;