const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

router.post("/refreshToken", authController.refreshToken);

router.post("/resetpassword", authController.sendRestPasswordLink);

module.exports = router;
