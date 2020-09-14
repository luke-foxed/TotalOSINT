const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
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
  game_preferences: {
    type: Array,
  },
  reviews: {
    type: Array,
  },
  wishlist: {
    type: Array,
  },
  comments: {
    type: String,
  },
});

module.exports = mongoose.model('user', UserSchema);
