const express = require("express");
const router = express.Router();

const instructorController = require("../controller/instructors");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/profile", verifyToken, instructorController.createProfile);

router.post("/availability", verifyToken, instructorController.addAvailability);

router.get("/availability/:uuid", instructorController.getAvailability);

router.get("/search", instructorController.getInstructorsByArea);

module.exports = router;