const userModel = require('../models/users');
const optGenerate = require('otp-generator');
const OTP = require('../models/otpmodels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, resp) => {
  const { username, email, password } = req.body;
  try {
    const exstinguser = await userModel.findOne({ email: email });
    console.log('exstinguser ======> ', exstinguser);
    if (exstinguser) {
      return resp.status(400).json({ message: 'user already exist' });
    }

    let otp = optGenerate.generate(6, {
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

    const hashpass = await bcrypt.hash(password, 10);

    const result = await userModel.create({
      email: email,
      password: hashpass,
      username: username,
    });

    const token = await jwt.sign(
      { username: result.username, email: result.email, id: result._id },
      SECRET_KEY
    );

    return resp.status(201).json({
      user: result,
      token: token,
      otp: otp,
      message: 'Successfull SignUp! OTP sent successfully',
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({ message: 'Something happened on Server' });
  }
};

const signin = async (req, resp) => {
  // const { email, password, otp } = req.body;
  const { email, password } = req.body;
  try {
    const exstinguser = await userModel.findOne({ email: email });
    console.log('exstinguser ======> ', exstinguser);
    if (!exstinguser) {
      return resp.status(404).json({ message: 'user not found' });
    }

    const matchpassword = await bcrypt.compare(password, exstinguser.password);
    if (!matchpassword) {
      return resp.status(400).json({ message: 'Invaild credentail' });
    }
    // if (!password) {
    //   return resp.status(400).json({ message: 'Invaild credentail' });
    // }

    // const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    // if (response.length === 0 || otp !== response[0].otp) {
    //   return resp.status(400).json({
    //     success: false,
    //     message: 'The OTP is not valid',
    //   });
    // }

    const token = await jwt.sign(
      { email: exstinguser.email, id: exstinguser._id },
      SECRET_KEY
    );
    resp.status(201).json({
      exstinguser: exstinguser,
      token: token,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: 'Something happen on Server' });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email: email });

    if(!user){
      return resp.status(404).json({ message: 'user not found' });
    }

    
  } catch (error) {
    console.log('Error =====> ', error.message);
  }
};

// const userDetail = async (req, resp) => {
//   const { username } = req.body;
//   console.log('username ===> ', username);
//   try {
//     const user = await userModel.findOne({ username: username });
//     console.log('user ===> ', user);

//     if (!user) {
//       return resp.status(404).json({ message: 'User not found' });
//     }

//     resp.status(200).json(user);
//   } catch (error) {
//     console.log(error);
//     resp.status(500).json({ message: 'Something happened on Server' });
//   }
// };
const userDetail = async (req, resp) => {
  const { email } = req.body;
  console.log('email ===> ', email);
  try {
    const user = await userModel.findOne({ email: email });
    console.log('user ===> ', user);

    if (!user) {
      return resp.status(404).json({ message: 'User not found' });
    }

    resp.status(200).json(user);
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: 'Something happened on Server' });
  }
};
const getallusers = async (req, resp) => {
  try {
    const users = await userModel.find();
    resp.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    resp.status(500).json({ message: 'Sever not respond' });
  }
};
module.exports = { signin, signup, userDetail, getallusers };
