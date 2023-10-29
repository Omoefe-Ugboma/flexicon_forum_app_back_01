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
    validate: {
      validator: function(v) {
        // Use a regex to validate the email format
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
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
    Thread :{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thread',
      required: true
    },
    badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],
    community:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Com' }],
    reputation: { type: Number, default: 0 }
  }
});

// Hash the password before saving
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

// Compare passwords for authentication
userSchema.methods.comparePassword = async function(candidatePassword) {
  const user = this;
  return await bcrypt.compare(candidatePassword, user.password);
};

// Create the user model
const User = mongoose.model('User', userSchema);

module.exports = User;