const userModel = require('../models/users');
const OTP = require('../models/otpmodels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, resp) => {
  const { username, email, password, otp } = req.body;
  try {
    const exstinguser = await userModel.findOne({
      email: email,
    });
    console.log('exstinguser ======> ', exstinguser);
    if (exstinguser) {
      return resp.status(400).json({ message: 'user already exist' });
    }
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      return resp.status(400).json({
        success: false,
        message: 'The OTP is not valid',
      });
    }
    const hashpass = await bcrypt.hash(password, 10);

    const result = await userModel.create({
      email: email,
      password: hashpass,
      username: username,
    });
    // const result = await userModel.create({
    //   email: email,
    //   password: password,
    //   username: username,
    // });

    const token = await jwt.sign(
      { username: result.username, email: result.email, id: result._id },
      SECRET_KEY
    );

    resp
      .status(201)
      .json({ user: result, token: token, message: 'Successfull SignUp!!!' });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: 'Something happen on Server' });
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
