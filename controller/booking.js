const { v4: uuidv4 } = require("uuid");
const bookingModel = require("../config/booking");
const packageModel = require("../config/packages");
const { responseCode } = require("../helper/responseCode");

exports.createBooking = async (req, res) => {
  try {

    const student_uuid = req.user.uuid;

    const {
      instructor_uuid,
      package_uuid,
      license_type,
      car_ownership,
      car_details,
      transmission,
      lesson_date,
      lesson_time,
      payment_method
    } = req.body;

    // 1️⃣ Validate required fields
    if (!instructor_uuid || !package_uuid || !lesson_date || !lesson_time) {
      return res.status(400).json({
        code: responseCode.VALIDATION_ERROR,
        message: "Missing required fields"
      });
    }

    // 2️⃣ Check schedule conflict
    const [existing] = await bookingModel.checkInstructorSchedule(
      instructor_uuid,
      lesson_date,
      lesson_time
    );

    if (existing.length > 0) {
      return res.status(400).json({
        code: responseCode.ERROR,
        message: "Instructor already booked for this time"
      });
    }

    // 3️⃣ Get package price (DO NOT TRUST FRONTEND)
    const [pkg] = await packageModel.getPackageByUUID(package_uuid);

    if (!pkg || pkg.length === 0) {
      return res.status(404).json({
        code: responseCode.ERROR,
        message: "Package not found"
      });
    }

    const packagePrice = pkg[0].price;

    // Example: 20% reservation fee
    const reservation_fee = payment_method === "reservation"
      ? packagePrice * 0.20
      : packagePrice;

    // 4️⃣ Create booking
    await bookingModel.createBooking({
      uuid: uuidv4(),
      student_uuid,
      instructor_uuid,
      package_uuid,
      license_type,
      car_ownership,
      car_details,
      transmission,
      lesson_date,
      lesson_time,
      reservation_fee,
      payment_method,
      status: "pending"
    });

    return res.status(201).json({
      code: responseCode.SUCCESS,
      message: "Booking created successfully"
    });

  } catch (error) {

    return res.status(500).json({
      code: responseCode.ERROR,
      message: error.message
    });

  }
};