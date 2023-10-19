// Import mongoose module
const mongoose = require('mongoose')

// Connect to database with given url
const connectDB = url => {
  return mongoose.connect(url)
}

module.exports = connectDB
