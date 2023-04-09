const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/changeinfo", verifyToken, userController.changeInfo);

module.exports = router;
