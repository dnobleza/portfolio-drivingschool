const db = require("../config/db");

exports.createBooking = async (data) => {
  return db.query(
    `INSERT INTO bookings
    (
      uuid,
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
      status
    )
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.uuid,
      data.student_uuid,
      data.instructor_uuid,
      data.package_uuid,
      data.license_type,
      data.car_ownership,
      data.car_details,
      data.transmission,
      data.lesson_date,
      data.lesson_time,
      data.reservation_fee,
      data.payment_method,
      data.status || "pending"
    ]
  );
};

exports.checkInstructorSchedule = async (instructor_uuid, date, time) => {
  return db.query(
    `SELECT id
     FROM bookings
     WHERE instructor_uuid = ?
     AND lesson_date = ?
     AND lesson_time = ?
     AND status != 'cancelled'`,
    [instructor_uuid, date, time]
  );
};

exports.getStudentBookings = async (uuid) => {
  return db.query(
    `SELECT *
     FROM bookings
     WHERE student_uuid = ?
     ORDER BY lesson_date ASC`,
    [uuid]
  );
};

exports.getInstructorBookings = async (uuid) => {
  return db.query(
    `SELECT *
     FROM bookings
     WHERE instructor_uuid = ?
     ORDER BY lesson_date ASC`,
    [uuid]
  );
};