const jwt = require('jsonwebtoken');
const SECRET_KEY = 'Raman';

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(' ')[1];
      console.log('token =====> ', token);
      let user = jwt.verify(token, SECRET_KEY);
      console.log('user =====> ', user);
      req.userId = user.id;
    } else {
      return res.status(401).json({ message: 'Unauthorized User' });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Unauthorized User' });
  }
};

module.exports = auth;
