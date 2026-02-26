const express = require("express");
const router = express.Router();
const authController = require("../controller/userController");

router.post("/register", authController.register);
router.get("/users/:email", authController.findUserByEmail);
router.get("/users", authController.getAllUsers);
router.put("/users/:uuid", authController.updateUser);

module.exports = router;