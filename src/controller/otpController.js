const optGenerate = require('otp-generator');
const OTP = require('../models/otpmodels');
const users = require('../models/users');

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    console.log('email ==> ', email);
    const checkpoint = await users.findOne({ email: email });

    if (checkpoint) {
      return res.status(401).json({
        success: false,
        message: 'User is already registered',
      });
    }

    let otp = optGenerate.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = optGenerate.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { sendOtp };
