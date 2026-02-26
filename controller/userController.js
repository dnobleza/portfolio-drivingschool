const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const users = require("../config/user");
const { validateRegister } = require("../helper/regex");
const { responseCode } = require("../helper/responseCode");
const { logger } = require("../helper/logger");

const TAG = "DRIVING-SCHOOL";

exports.register = async (req, res) => {
    try {
        logger.info(TAG, "Register request received");

        const { name, email, mobile_number, address, password, role } = req.body;

        const validateError = validateRegister({ name, email, mobile_number, password, role });

        if (validateError) {
            logger.info(TAG, `Validation failed: ${validateError}`);
            return res.status(400).json({
                code: responseCode.VALIDATION_ERROR,
                message: validateError
            });
        }

        const [existingUser] = await users.findUserByEmail(email);

        if (existingUser.length > 0) {
            logger.info(TAG, `User already exists: ${email}`);
            return res.status(400).json({
                code: responseCode.USER_EXISTS,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await users.createUser({ uuid: uuidv4(), name, email, mobile_number, address, password: hashedPassword, role });

        logger.info(TAG, `User registered successfully: ${email}`);

        return res.status(201).json({
            code: responseCode.SUCCESS,
            message: "User registered successfully"
        });

    } catch (error) {
        logger.error(TAG, `Register error: ${error.message}`);

        return res.status(500).json({
            code: responseCode.ERROR,
            message: "Internal server error"
        });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        logger.info(TAG, "Fetching all users");

        const [usersList] = await users.getAllUsers();

        return res.status(200).json({
            code: responseCode.SUCCESS,
            data: usersList
        });

    } catch (error) {
        logger.error(TAG, `Get all users error: ${error.message}`);

        return res.status(500).json({
            code: responseCode.ERROR,
            message: "Internal server error"
        });
    }
};

exports.findUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;

        logger.info(TAG, `Fetching user by email: ${email}`);

        const [user] = await users.findUserByEmail(email);

        if (user.length === 0) {
            logger.info(TAG, `User not found: ${email}`);
            return res.status(404).json({
                code: responseCode.ERROR,
                message: "User not found"
            });
        }

        return res.status(200).json({
            code: responseCode.SUCCESS,
            data: user[0]
        });

    } catch (error) {
        logger.error(TAG, `Get user by email error: ${error.message}`);

        return res.status(500).json({
            code: responseCode.ERROR,
            message: "Internal server error"
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { uuid } = req.params;
        const { name, mobile_number, address, role } = req.body;

        logger.info(TAG, `Updating user: ${uuid}`);

        if (!name || !mobile_number || !role) {
            return res.status(400).json({
                code: responseCode.VALIDATION_ERROR,
                message: "Name, mobile number and role are required"
            });
        }

        const [result] = await users.updateUser(uuid, { name,mobile_number,address,role });

        if (result.affectedRows === 0) {
            return res.status(404).json({
                code: responseCode.ERROR,
                message: "User not found"
            });
        }

        logger.info(TAG, `User updated successfully: ${uuid}`);

        return res.status(200).json({
            code: responseCode.SUCCESS,
            message: "User updated successfully"
        });

    } catch (error) {
        logger.error(TAG, `Update error: ${error.message}`);

        return res.status(500).json({
            code: responseCode.ERROR,
            message: "Internal server error"
        });
    }
};