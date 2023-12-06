const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const userId = await userModel.createUser(email, password);
    return res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Do not return the hashed password in the response
    delete user.password;

    // Create and sign JWT token for authentication
    const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a reset token and update it in the database
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    await userModel.updateResetToken(user.id, resetToken);

    // Send the reset token to the user's email (you can use a third-party email service for this)

    return res.status(200).json({ message: 'Password reset token sent to your email' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};