const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {  sendOTP, generateOTPForEmail, verifyOTP } = require("./OtpController");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.findOne({ where: { email } });
    if (!userExist) {
      return res.status(404).json({ message: "Email not found!" })
    };

    if (!userExist.isEmailVerified) {
      return res.status(403).json({
        message: "Email not verified! Please check your email for the OTP.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials!" })
    };

    const token = jwt.sign(
      { id: userExist.id, email: userExist.email },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Login successful!", accessToken: token });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, address} = req.body;
    if (password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match" });

    const existingUserEmail = await User.findOne({ where: { email } });
    if (existingUserEmail) return res.status(400).json({ message: "Email already exists" });

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) return res.status(400).json({ message: "Username already exists" });

    const hashPassword = bcrypt.hashSync(password, 10);
    await User.create({
      username, email, password: hashPassword,
      isEmailVerified: false, address
    });

    await sendOTP(email);

    return res.status(201).json({ message: "Registration successful. Please verify your email with the OTP sent." });
  } catch (error) {
    console.error("Error registering:", error);
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Email not found" })
    };

    const otp = generateOTP();
    otpStore[email] = otp;
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "MeroRide Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`
    });

    return res.status(200).json({ message: "Password reset OTP sent to your email" });
  } catch (error) {
    console.error("Error in forgot password:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (otpStore[email] && otpStore[email] === otp) {
      const hashPassword = bcrypt.hashSync(newPassword, 10);
      await User.update({ password: hashPassword }, { where: { email } });
      // await User.update({ isEmailVerified: true }, { where: { email } });
      delete otpStore[email];
      return res.status(200).json({ message: "Password reset successfully" });
    }
    return res.status(400).json({ message: "Invalid or expired OTP" });
  } catch (error) {
    console.error("Error resetting password:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { login, register, forgotPassword, resetPassword };
