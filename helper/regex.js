const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,32}$/;

const mobileRegex = /^\+?[0-9]{10,15}$/;

exports.validateRegister = ({ name, email, mobile_number, password, role }) => {

    if (!name || !email || !mobile_number || !password || !role) {
        return "All fields are required";
    }

    if (!emailRegex.test(email)) {
        return "Invalid email format";
    }

    if (!mobileRegex.test(mobile_number)) {
        return "Invalid mobile number format (10–15 digits, optional +)";
    }

    if (!passwordRegex.test(password)) {
        return "Password must be 6–32 characters and include at least one letter, one number, and one special character (@$!%*?&)";
    }

    const allowedRoles = ["student", "instructor"];

    if (!allowedRoles.includes(role)) {
        return "Invalid role selected";
    }

    return null;
};