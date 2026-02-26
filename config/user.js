const db = require('../config/db');

exports.createUser = async (userData) => {
    const { uuid, name, email, mobile_number, address, password, role } = userData;

    return db.query(
        `INSERT INTO users 
        (uuid, name, email, mobile_number, address, password, role)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [uuid, name, email, mobile_number, address, password, role]
    );
};

exports.findUserByEmail = async (email) => {
    return db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );
};

exports.getAllUsers = async () => {
    return db.query(
        `SELECT id, uuid, name, email, mobile_number, role, created_at 
         FROM users`
    );
};

exports.updateUser = async (uuid, data) => {
    const { name, mobile_number, address, role } = data;

    return db.query( 
        `UPDATE users SET name = ?, mobile_number = ?, address = ?, role = ?, updated_at = NOW() WHERE uuid = ?`,
        [name, mobile_number, address, role, uuid]
    );
};