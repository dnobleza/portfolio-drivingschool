const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sendAccountLockEmail } = require("./helper/emailService");

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use("/api/driving-school/v1", authRoutes);

app.get("/test-email", async (req, res) => {
    try {
        await sendAccountLockEmail("danerwinnobleza@gmail.com");
        res.send("Email sent");
    } catch (err) {
        console.error(err);
        res.send("Email failed");
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});