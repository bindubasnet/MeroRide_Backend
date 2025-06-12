const Driver = require("../models/driver");
const User = require("../models/User");
const nodemailer = require('nodemailer');
const OTP = require('../models/OTP');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
let otpStore = {};

const sendOTP = async (email) => {
  const otp = generateOTP();
  const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

  await OTP.destroy({ where: { email } }); // clear existing
  await OTP.create({ email, otp, expiresAt: expiry });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: 'MeroRide OTP Verification',
    text: `Your OTP is: ${otp}.`,
  });
return otp;
};

const generateOTPForEmail = async (req, res) => {
  try {
    // const { email } = req.body;

    // if (!email) return res.status(400).json({ message: "Email is required" });

    // const existingUserEmail = await User.findOne({ where: { email } });

    // const existingDriverEmail = await Driver.findOne({ where: { email } });

    console.log("hello");


    if (req.body.email) {
      const otp = generateOTP();
      otpStore[req.body.email] = otp;
      sendOTP(req.body.email, otp);
      console.log({ message: "OTP sent successfully" });

      return res.status(200).json({ message: "OTP sent successfully" });
    } else {
      return res.status(400).json({ message: "Email doesnot exist" });
    }

  } catch (error) {
    console.error("Error generating OTP:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const verifyOTP = async (req, res) => {
  // try {
  //   const { email, otp, role } = req.body;
  //   if (otpStore[email] && otpStore[email] === otp) {
  //     await User.update({ isEmailVerified: true }, { where: { email } });
  //     delete otpStore[email];
  //     return res.status(200).json({ message: "Email verified successfully" });
  //   }
  //   return res.status(400).json({ message: "Invalid or expired OTP" });
  // } catch (error) {
  //   console.error("Error verifying OTP:", error.message);
  //   return res.status(500).json({ message: "Internal server error" });
  // }
  const { email, otp, role } = req.body;
  try {
    if(!email || !otp || !role){
      return res.status(400).json({message:"Invalid request!"});
    }
    
    const record = await OTP.findOne({ where: { email, otp } });
    console.log(record);

    if (!record || record.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    if (role?.toLowerCase() === "user") {
      await User.update({ isEmailVerified: true }, { where: { email } });
    } else if (role?.toLowerCase() === "driver") {
      await Driver.update({ isEmailVerified: true }, { where: { email } });
    }

    await OTP.destroy({ where: { email } });

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("OTP verification error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = { sendOTP, generateOTPForEmail, verifyOTP }