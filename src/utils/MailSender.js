const nodemailer = require('nodemailer');
require('dotenv').config();
const mailsender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      // host: process.env.MAIL_HOST,
      // port: process.env.MAIL_PORT,
      // secure: process.env.MAIL_SECURE === 'true',
      // logger: true,
      // debug: true,
      host: 'smtp.gmail.com',
      port: 465, // Use port 465 for SSL
      secure: true, // true for 465, false for other ports
      // logger: true,
      // debug: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    // console.log('Trnsporter ==> ', transporter);
    let info = await transporter.sendMail({
      from: 'ramandeep singh',
      to: email,
      subject: title,
      html: body,
    });
    console.log('Email info ===> ', info);
    return info;
  } catch (error) {
    console.log(error.massage);
  }
};
module.exports = mailsender;
