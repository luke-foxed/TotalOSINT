const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  savedResults: {
    type: Array,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('user', UserSchema);
