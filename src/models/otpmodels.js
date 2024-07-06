const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      'Verification Email',
      `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: blue;">Email Verification</h1>
        <p>Dear User,</p>
        <p>Thank you for registering with us. Please use the following One-Time Password (OTP) to complete your verification process:</p>
        <p style="font-size: 20px; font-weight: bold; color: #555;">${otp}</p>
        <p>This OTP is valid for the next 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
        <p>Best Regards,<br>Ramandeep singh</p>
      </div>
    `
    );
    console.log('Email sent successfully: ', mailResponse);
  } catch (error) {
    console.log('Error occurred while sending email: ', error);
    throw error;
  }
}
otpSchema.pre('save', async function (next) {
  console.log('New document saved to the database');
  // Only send an email when a new document is created
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});
module.exports = mongoose.model('OTP', otpSchema);
