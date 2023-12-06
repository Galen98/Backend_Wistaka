const db = require('../db/db');
const bcrypt = require('bcrypt');

exports.createUser = async (email, password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    const [result] = await db.execute(query, [email, hashedPassword]);

    return result.insertId;
  } catch (error) {
    throw error;
  }
};

exports.getUserByEmail = async (email) => {
  try {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await db.execute(query, [email]);

    return rows.length ? rows[0] : null;
  } catch (error) {
    throw error;
  }
};

exports.updateResetToken = async (userId, resetToken) => {
  try {
    const query = 'UPDATE users SET reset_token = ? WHERE id = ?';
    await db.execute(query, [resetToken, userId]);
  } catch (error) {
    throw error;
  }
};