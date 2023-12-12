const mongoose = require('mongoose')
const { generateFromEmail } = require('unique-username-generator')
const bcrypt = require('bcryptjs')
const Badge = require('./Badge')
const jwt = require('jsonwebtoken')

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    profile: {
      name: {
        type: String,
        minlength: 3,
        maxlength: 25,
      },
      bio: {
        type: String,
        minlength: 3,
        maxlength: 150,
      },
      avatar: String,
    },
    activity: {
      badge: { type: mongoose.Schema.Types.ObjectId, ref: 'Badge' },
      threads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread' }],
      communities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Community' }],
      reputation: {
        type: Number,
        default: 0,
        validate: {
          validator: async function (value) {
            // Define the reputation thresholds for each badge
            const thresholds = {
              Rookie: 0,
              Hacker: 10,
              Guru: 50,
              Ninja: 100,
              Master: 500,
            }
            // Find the highest badge that the user qualifies for
            let badgeName = 'Rookie'
            for (let name in thresholds) {
              if (value >= thresholds[name]) {
                badgeName = name
              }
            }
            // Find the badge document by name
            const badge = await Badge.findOne({ name: badgeName })
            // Assign the badge id to the badge property
            this.activity.badge = badge._id
            // Return true to pass the validation
            return true
          },
          message: 'Invalid reputation value',
        },
      },
    },
  },
  { timestamps: true }
)

// Add a pre-save hook to assign a default badge
userSchema.pre('save', async function (next, done) {
  // Check if the document is new
  if (this.isNew) {
    // Find the rookie badge by name
    console.log('I am new')
    const rookieBadge = await Badge.findOne({ name: 'Rookie' })
    // Add the badge id to the badge
    this.activity.badge = rookieBadge._id
  }
  // Call the next middleware
  next()
  done()
})

// Mongoose middleware for complex validation
userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  this.username ??= generateFromEmail(this.email, 3)
})

//function created to compare password with hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

//create index for querying the model
userSchema.index({ username: 'text' })

// Create the user model
const User = mongoose.model('User', userSchema)

module.exports = User
