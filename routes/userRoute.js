const express = require('express');
const controller = require('../controllers/userController');
const router = express.Router();
const {isLoggedIn, isGuest} = require('../middlewares/auth');

//get signup page
router.get("/signup", isGuest, controller.signupPage);

//post signup request
router.post("/", isGuest, controller.signup);

//get login page
router.get('/login', isGuest, controller.loginPage);

//post login request
router.post('/login', isGuest, controller.login);

//get profile
router.get('/profile', isLoggedIn, controller.profilePage);

//get logout
router.get('/logout', isLoggedIn, controller.dologout);

module.exports = router;