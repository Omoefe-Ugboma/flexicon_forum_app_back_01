const Jwt = require('jsonwebtoken')
const BlackList = require('../models/Blacklist')

// Create user's access token
const createToken = async userId => {
  return Jwt.sign({ userId, name: this.username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}
// Verify user's access token
const authorize = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(403).json({ msg: 'Access Denied' })
  }
  const token = authHeader.split(' ')[1]
  //check if token is blacklisted
  const blacklisted = await BlackList.findOne({ token })
 if (blacklisted) {
  return res.status(403).json({ message: 'Access denied. Token blacklisted.' })
}
  // Token verification
  try {
    const decodedToken = Jwt.verify(token, process.env.JWT_SECRET)
    req.user = decodedToken // Store the decoded token in the request for further use
    next() // Token is valid, proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Authorization Failed' })
  }
}

module.exports = { createToken, authorize }
