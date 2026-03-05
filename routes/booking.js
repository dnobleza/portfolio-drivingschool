const express = require("express");
const router = express.Router();

const bookingController = require("../controller/booking");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, bookingController.createBooking);

// router.get("/student", verifyToken, bookingController.getStudentBookings);

// router.get("/instructor", verifyToken, bookingController.getInstructorBookings);

module.exports = router;