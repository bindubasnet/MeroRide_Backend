const express = require('express');
const router = express.Router();
const{loginDriver, register, forgotPasswordDriver, resetPasswordDriver} = require("../controllers/drivercontroller");
const{verifyOTP, generateOTPForEmail} = require("../controllers/OtpController");
// const upload = require('../middleware/upload');

router.post('/register', register);
router.post('/generateotp', generateOTPForEmail);
router.post('/verifyotp', verifyOTP);
router.post('/login', loginDriver);
router.post('/forgotpassword', forgotPasswordDriver);
router.post('/resetpassword', resetPasswordDriver);

module.exports = router;