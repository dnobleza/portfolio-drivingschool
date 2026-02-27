const rateLimit = require("express-rate-limit");

module.exports = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: {
        code: "06",
        message: "Too many login attempts. Please try again after 5 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false
});