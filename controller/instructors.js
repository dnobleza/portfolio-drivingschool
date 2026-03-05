const instructorModel = require("../config/instructors");
const { responseCode } = require("../helper/responseCode");

exports.createProfile = async (req, res) => {
  try {

    const instructor_uuid = req.user.uuid;

    const {
      license_number,
      experience_years,
      service_area,
      transmission_type,
      vehicle_model,
      vehicle_plate
    } = req.body;

    await instructorModel.createProfile({
      instructor_uuid,
      license_number,
      experience_years,
      service_area,
      transmission_type,
      vehicle_model,
      vehicle_plate
    });

    return res.status(201).json({
      code: responseCode.SUCCESS,
      message: "Instructor profile created"
    });

  } catch (error) {

    return res.status(500).json({
      code: responseCode.ERROR,
      message: error.message
    });

  }
};

exports.getInstructorsByArea = async (req, res) => {

  try {

    const { area } = req.query;

    const [rows] = await instructorModel.getInstructorsByArea(area);

    return res.status(200).json({
      code: responseCode.SUCCESS,
      data: rows
    });

  } catch (error) {

    return res.status(500).json({
      code: responseCode.ERROR
    });

  }
};

exports.addAvailability = async (req, res) => {

  try {

    const instructor_uuid = req.user.uuid;

    const { day_of_week, start_time, end_time } = req.body;

    await instructorModel.createAvailability({
      instructor_uuid,
      day_of_week,
      start_time,
      end_time
    });

    return res.status(201).json({
      code: responseCode.SUCCESS,
      message: "Availability added"
    });

  } catch (error) {

    return res.status(500).json({
      code: responseCode.ERROR
    });

  }
};

exports.getAvailability = async (req, res) => {

  try {

    const { uuid } = req.params;

    const [rows] = await instructorModel.getAvailability(uuid);

    return res.status(200).json({
      code: responseCode.SUCCESS,
      data: rows
    });

  } catch (error) {

    return res.status(500).json({
      code: responseCode.ERROR
    });

  }
};