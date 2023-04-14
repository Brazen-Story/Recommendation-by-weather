const express = require('express');
const router = express.Router();

const userController = require('../controllers/authController');

router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/user/manager', userController.ManagerUserList)

module.exports = router;

//login