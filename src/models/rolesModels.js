const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const subAdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Add admin-specific fields
});

module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Admin', adminSchema);
module.exports = mongoose.model('SubAdmin', subAdminSchema);
