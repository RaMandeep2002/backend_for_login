const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;
// const SECRET_KEY = 'Raman';

const auth = (req, res, next) => {
  // try {
  let token = req.headers.authorization;
  if (token) {
    token = token.split(' ')[1];
    const user = jwt.verify(token, SECRET_KEY);
    req.userId = user.id;
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized User  try' });
  }
  // } catch (error) {
  //   console.log('error', error);
  //   res.status(401).json({ message: 'Unauthorized User catch' });
  // }
};

module.exports = auth;
