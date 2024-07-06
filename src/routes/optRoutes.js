const express = require('express');
const { sendOtp } = require('../controller/otpController');

const otpRouter = express.Router();

otpRouter.post('/send-otp', sendOtp);

module.exports = otpRouter;
