const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

router.get("/login", userController.login);
router.post("/signup", userController.signup);

module.exports = router;
