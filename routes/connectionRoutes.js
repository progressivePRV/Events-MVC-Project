const express = require('express');
const router = express.Router();
const controller = require('../controllers/connectionController');

//GET /connections: send all the connection
router.get("/",controller.showAll);

//GET /connections/new send new connection form
router.get("/new",controller.new);

//POST /connections create new connection
router.post("/",controller.createConnection);

//GET /connections/:id send specific connection
router.get("/:id",controller.findById);

//GET /connections/:id/edit send edit page for specific connection
router.get("/:id/edit",controller.editById);

//POST /connections/:id edit the specific connection
router.put("/:id",controller.updateById);

//DELETE /connections/:id delete the specific connection and show all connection.
router.delete("/:id",controller.deleteById);


module.exports = router;
