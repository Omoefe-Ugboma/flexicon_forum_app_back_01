const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
    },
    threads :[{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread'}],
    communities:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Com' }],
    reputation: { type: Number, default: 0 }
  }
},
{ timestamps : true}
)

//function created to hash password
userSchema.pre('save', async function(){
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)
})

//function created to create a user's token
userSchema.methods.createJWT = function(){
  return jwt.sign({userId:this._id,name:this.username}, process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}

//function created to compare password with hashed password
userSchema.methods.comparePassword = async function(candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword,this.password)
  return isMatch
}

// Create the user model
const User = mongoose.model('User', userSchema);

module.exports = User;