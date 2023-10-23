const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  profile: {
    name: String,
    bio: String,
    avatar: String
  },
  activity: {
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
    badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],
    reputation: { type: Number, default: 0 }
  }
});


// Create the user model
const User = mongoose.model('User', userSchema);

module.exports = User;