const express = require('express');
const router = express.Router();
const passport = require("passport");

const userController = require('../controllers/authController');

router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/success', userController.loginSuccess);
router.get('/Reissuance', userController.loginKeep);
router.post('/logout', userController.logoutUser);
router.get('/user/manager', userController.ManagerUserList);

module.exports = router;