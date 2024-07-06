const express = require('express');
const {
  signup,
  signin,
  userDetail,
  getallusers,
} = require('../controller/userController');
const auth = require('../middlewares/auth');

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/signin', auth, signin);
userRouter.get('/user_details', auth, userDetail);
// userRouter.get('/user_details', userDetail);
userRouter.get('/alluser', getallusers);

module.exports = userRouter;
  