const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sendAccountLockEmail } = require("./helper/emailService");

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const instructorRoutes = require("./routes/instructors");
const bookingRoutes = require("./routes/booking");
const packageRoutes = require("./routes/packages");


app.use("/api/instructors", instructorRoutes);
app.use("/api/driving-school/v1", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/packages", packageRoutes);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});