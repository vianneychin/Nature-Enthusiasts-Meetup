const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/test", authController.test);

module.exports = router;
