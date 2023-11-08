// BADGE MODEL
const mongoose = require('mongoose')

// Define the badge schema
const badgeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    criteria: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

// Create the badge model
const Badge = mongoose.model('Badge', badgeSchema)

module.exports = Badge
