const db = require("../config/db");

exports.getPackages = async () => {
  return db.query("SELECT * FROM packages");
};

exports.getPackageByUUID = async (uuid) => {
  return db.query(
    "SELECT * FROM packages WHERE uuid = ?",
    [uuid]
  );
};