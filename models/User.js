const mongoose = require('mongoose');

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
    Thread :[{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread'}],
    badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],
    community:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Com' }],
    reputation: { type: Number, default: 0 }
  }
},
{ timestamps : true}
);

// Create the user model
const User = mongoose.model('User', userSchema);

module.exports = User;