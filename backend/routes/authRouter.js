const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

router.post("/refreshToken", authController.refreshToken);

router.post("/passwordrequired", authController.sendRestPasswordLink);

router.put("/resetpassword", authController.resetPassword);

module.exports = router;
