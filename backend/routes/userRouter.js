const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/changename", verifyToken, userController.changeName);
router.post("/changeavatar", verifyToken, userController.changeAvatar);

module.exports = router;
