const otpGenerator = require('otp-generator');
const OTP = require('../models/otpmodels');
const users = require('../models/users');

const verifyotp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log('email ==> ', email);
    const checkpoint = await users.findOne({ email: email });

    if (!checkpoint) {
      return res.status(401).json({
        success: false,
        message: 'User is already registered',
      });
    }

    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: 'The OTP is not valid',
      });
    }
    res.status(201).json({ status: '1', message: 'Successfull!!' });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const resendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    console.log('email ===> ', email);
    console.log('resend otp');

    const user = await users.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let resultotp = await OTP.findOne({ otp: otp });
    while (resultotp) {
      otp = optGenerate.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      resultotp = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    await OTP.create(otpPayload);
    await OTP.updateOne({ email: email }, { otp: otp }, { upsert: true });
    return res.status(200).json({
      message: 'OTP resent successfully',
      otp: otp, // Include this for debugging purposes only, remove in production
    });
  } catch (error) {
    console.log('Error ===> ', error.message);
    return res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = { verifyotp, resendOtp };
// module.exports = { sendOtp, resendOtp };
