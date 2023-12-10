// BADGE MODEL
const mongoose = require('mongoose')

// Define the badge schema
const badgeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ['Rookie', 'Hacker', 'Guru', 'Ninja', 'Master'],
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    icon: {
      type: String,
      required: true,
      default: function () {
        switch (this.name) {
          case 'Rookie':
            return '😐';
          case 'Hacker':
            return '😁';
          case 'Guru':
            return '😍';
          case 'Ninja':
            return '🥷';
          case 'Master':
            return '🙌';
          default:
            return '';
        }
      },
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
