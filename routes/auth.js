const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/login", authController.login);
router.post("/login", authController.createLoginSession);
router.get("/logout", authController.destroy);
router.get("/register", authController.register);
router.post("/register", authController.createRegisterSession);

module.exports = router;