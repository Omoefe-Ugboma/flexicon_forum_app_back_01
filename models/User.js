const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
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
    name: {
      type:String,
       minlength:3,
        maxlength:25
      },
    bio:{
      type:String,
       minlength:3,
        maxlength:150
      },
    avatar: String
  },
  activity: {
    badge:  {type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true
    },
    threads :[{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread'}],
    communities:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Com' }],
    reputation: { type: Number, default: 0 }
  }
},
{ timestamps : true}
);

// Create the user model
const User = mongoose.model('User', userSchema);

module.exports = User;