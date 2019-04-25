const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

router.get("/login", userController.login);
router.post("/", userController.create);
router.get("/register", userController.register);
router.get("/", userController.index);

module.exports = router;
