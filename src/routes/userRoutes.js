const express = require('express');
const { signup, signin } = require('../controller/userController');
const auth = require('../middlewares/auth');

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/signin',  signin);

module.exports = userRouter;
