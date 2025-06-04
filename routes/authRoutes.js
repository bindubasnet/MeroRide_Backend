const express = require("express");
const{login, register, forgotPassword, resetPassword} = require("../controllers/authcontroller");
const{verifyOTP, generateOTPForEmail} = require("../controllers/OtpController");
const router = express.Router();

router.post("/login", login);
router.post('/register', register);
router.post("/generate-otp", generateOTPForEmail)
router.post('/verify-otp', verifyOTP);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;