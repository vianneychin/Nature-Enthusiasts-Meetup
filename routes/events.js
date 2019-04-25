const express = require("express");
const router = express.Router();
const eventController = require("../controllers/events");

router.get("/", eventController.index);
router.get("/new", eventController.new);
// router.get("/show/:id", eventController.show)

module.exports = router;
