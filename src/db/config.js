const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost:27017/login_signup')
  .then(() => {
    console.log('connect successfully');
  })
  .catch((error) => {
    console.log(error);
  });
