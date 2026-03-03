const express = require("express");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

const authController = require("../controller/userController");
const loginLimiter = require("../middleware/ratelimiter");

router.post("/register", authController.register);
router.post("/login", loginLimiter, authController.login);

router.get("/users/:email", authController.findUserByEmail);
router.get("/users", authController.getAllUsers);
router.put("/users/:uuid", authController.updateUser);
router.put("/admin/unlock/:uuid",verifyToken, isAdmin, authController.adminUnlockUser);

module.exports = router;