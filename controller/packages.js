const packageModel = require("../config/packages");
const { responseCode } = require("../helper/responseCode");

exports.getPackages = async (req, res) => {

  try {

    const [rows] = await packageModel.getPackages();

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