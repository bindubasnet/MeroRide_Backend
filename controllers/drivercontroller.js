const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Driver = require('../models/driver');
const { sendOTP, generateOTPForEmail, verifyOTP } = require('./OtpController');

const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, phonenumber, address, vehicleType, vehicleNumber} = req.body;
    
    const files = req.files;

    if (password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match" });

    const existingDriverEmail = await Driver.findOne({ where: { email } });
    if (existingDriverEmail) return res.status(400).json({ message: "Email already exists" });

    const existingDrivername = await Driver.findOne({ where: { username } });
    if (existingDrivername) return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10); 

    const driver = await Driver.create({
      username,
      email,
      password: hashedPassword,
      phonenumber,
      address,
      vehicleType,
      vehicleNumber,
    });

    await sendOTP(email);

    return res.status(201).json({ message: "Registration successful. Please verify your email with the OTP sent." });
  } catch (error) {
    console.error("Error registering:", error);
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};

// Login Driver
const loginDriver = async (req, res) => {
  const { email, password } = req.body;
  try {
    const driver = await Driver.findOne({ where: { email } });
    if (!driver) {
      return res.status(400).json({ error: 'Invalid email.' });
    }

    if (!driver.isEmailVerified) {
      return res.status(400).json({ error: 'Email not verified.' });
    }

    const match = await bcrypt.compare(password, driver.password);
    if (!match) {
      return res.status(400).json({ error: 'Invalid password.' });
    }

    const token = jwt.sign({ id: driver.id, role: 'driver' }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed.' });
  }
};

// Forgot Password - Send OTP
const forgotPasswordDriver = async (req, res) => {
  const { email } = req.body;
  try {
    const driver = await Driver.findOne({ where: { email } });
    if (!driver) {
      return res.status(400).json({ error: 'Driver not found.' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    await OTP.destroy({ where: { email } });
    await OTP.create({ email, otp, expiresAt: expiry });

    await sendOTP(email, otp);
    res.status(200).json({ message: 'OTP sent to reset password.' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending OTP.' });
  }
};

// Reset Password
const resetPasswordDriver = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const record = await OTP.findOne({ where: { email, otp } });

    if (!record || record.expiresAt < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired OTP.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Driver.update({ password: hashedPassword }, { where: { email } });

    await OTP.destroy({ where: { email } });
    res.status(200).json({ message: 'Password reset successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset password.' });
  }
};
module.exports = {loginDriver, register, forgotPasswordDriver, resetPasswordDriver };