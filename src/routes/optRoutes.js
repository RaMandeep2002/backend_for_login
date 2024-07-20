const express = require('express');
const { resendOtp } = require('../controller/otpController');
const auth = require('../middlewares/auth');
const otpRouter = express.Router();

// otpRouter.post('/send-otp', auth, sendOtp);
// otpRouter.post('/send-otp', sendOtp);
otpRouter.post('/resendOtp', resendOtp);

module.exports = otpRouter;
