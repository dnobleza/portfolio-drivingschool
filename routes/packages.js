const express = require("express");
const router = express.Router();

const packageController = require("../controller/packages");

router.get("/", packageController.getPackages);

module.exports = router;