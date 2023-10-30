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
    //required: true
    },
    threads :[{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread'}],
    communities:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Com' }],
    reputation: { type: Number, default: 0 }
  }
},
{ timestamps : true}
)

userSchema.pre('save', async function(){
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.createJWT = function(){
  return jwt.sign({userId:this._id,name:this.username}, process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}

userSchema.methods.comparePassword = async function(candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword,this.password)
  return isMatch
}

// Create the user model
const User = mongoose.model('User', userSchema);

module.exports = User;