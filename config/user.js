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

exports.incrementFailedLogin = async (email) => {
    return db.query(`UPDATE users SET failed_login_attempts = failed_login_attempts + 1 WHERE email = ?`, [email]);
};

exports.lockAccount = async (email) => {
    return db.query(`UPDATE users SET lock_until = DATE_ADD(NOW(), INTERVAL 5 MINUTE) WHERE email = ?`,[email]);
};

exports.resetFailedLogin = async (email) => {
    return db.query(`UPDATE users SET failed_login_attempts = 0, lock_until = NULL WHERE email = ?`,[email]);
};

exports.adminUnlockAccount = async (uuid) => {
    return db.query(`UPDATE users SET failed_login_attempts = 0, lock_until = NULL WHERE uuid = ?`, [uuid]);
};