const express = require("express");
const router = express.Router();
const eventController = require("../controllers/events");

router.get("/", eventController.index);
router.get("/new", eventController.new);
router.post("/", eventController.create);
router.get('/:id', eventController.show);
router.get("/:id/edit", eventController.edit);
router.put("/:id", eventController.update);
router.delete("/:id", eventController.destroy);




module.exports = router;
