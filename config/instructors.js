const db = require("../config/db");

exports.createProfile = async (data) => {
  return db.query(
    `INSERT INTO instructor_profiles
    (instructor_uuid, license_number, experience_years, service_area,
     transmission_type, vehicle_model, vehicle_plate)
     VALUES (?,?,?,?,?,?,?)`,
    [
      data.instructor_uuid,
      data.license_number,
      data.experience_years,
      data.service_area,
      data.transmission_type,
      data.vehicle_model,
      data.vehicle_plate
    ]
  );
};

exports.getInstructorsByArea = async (area) => {
  return db.query(
    `SELECT u.uuid, u.name, p.service_area, p.rating
     FROM users u
     JOIN instructor_profiles p
     ON u.uuid = p.instructor_uuid
     WHERE u.role = 'instructor'
     AND p.service_area = ?`,
    [area]
  );
};

exports.createAvailability = async (data) => {
  return db.query(
    `INSERT INTO instructor_availability
    (instructor_uuid, day_of_week, start_time, end_time)
    VALUES (?,?,?,?)`,
    [
      data.instructor_uuid,
      data.day_of_week,
      data.start_time,
      data.end_time
    ]
  );
};

exports.getAvailability = async (uuid) => {
  return db.query(
    `SELECT day_of_week,start_time,end_time
     FROM instructor_availability
     WHERE instructor_uuid = ?`,
    [uuid]
  );
};