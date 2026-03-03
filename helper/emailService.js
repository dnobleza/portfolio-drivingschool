const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendAccountLockEmail = async (email) => {
    return transporter.sendMail({
        from: `"Driving School" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Account Locked",
        text: "Your account has been locked for 5 minutes due to multiple failed login attempts."
    });
};