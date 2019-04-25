const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

router.get("/login", userController.login);
router.post("/", userController.signup);
router.get("/register", userController.register);

module.exports = router;
