const express = require('express');
const router = express.Router();
const controller = require('../controllers/mainController');

//GET /: send index page or home page
router.get("/",controller.index);

//GET /contact: send contact page
router.get("/contact",controller.contact);

//GET /about: send about page
router.get("/about",controller.about);

module.exports = router;