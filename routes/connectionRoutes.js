const express = require('express');
const router = express.Router();
const controller = require('../controllers/connectionController');
const {isLoggedIn, isAuthor} = require('../middlewares/auth');
const {validateId} = require('../middlewares/validator');

//GET /connections: send all the connection
router.get("/",controller.showAll);

//GET /connections/new send new connection form
router.get("/new", isLoggedIn, controller.new);

//POST /connections create new connection
router.post("/", isLoggedIn, controller.createConnection);

//GET /connections/:id send specific connection
router.get("/:id", validateId, controller.findById);

//GET /connections/:id/edit send edit page for specific connection
router.get("/:id/edit", isLoggedIn, validateId, isAuthor, controller.editById);

//POST /connections/:id edit the specific connection
router.put("/:id", isLoggedIn, validateId, isAuthor, controller.updateById);

//DELETE /connections/:id delete the specific connection and show all connection.
router.delete("/:id", isLoggedIn, validateId, isAuthor, controller.deleteById);


module.exports = router;
