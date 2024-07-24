const express = require('express');
const { verifyotp, resendOtp } = require('../controller/otpController');
const auth = require('../middlewares/auth');
const otpRouter = express.Router();

// otpRouter.post('/send-otp', auth, sendOtp);
otpRouter.post('/verify-otp', verifyotp);
otpRouter.post('/resendOtp', resendOtp);

module.exports = otpRouter;
