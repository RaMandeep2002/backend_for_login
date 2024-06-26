const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'deep';
const signup = async (req, resp) => {
  const { username, email, password } = req.body;
  try {
    const exstinguser = await userModel.findOne({
      email: email,
    });
    console.log('exstinguser ======> ', exstinguser);
    if (exstinguser) {
      return resp.status(400).json({ message: 'user already exist' });
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
      { email: result.email, id: result._id },
      SECRET_KEY
    );

    resp.status(201).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: 'Something happen on Server' });
  }
};

const signin = async (req, resp) => {
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

module.exports = { signin, signup };
