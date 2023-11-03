const Jwt = require('jsonwebtoken')

// Create user's access token
const createToken = async userId => {
  return Jwt.sign({ userId, name: this.username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}

// Verify user's access token
const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization').substring(7)
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token missing.' })
  }

  // Token verification
  try {
    const decodedToken = Jwt.verify(token, process.env.JWT_SECRET)
    req.user = decodedToken // Store the decoded token in the request for further use
    // console.log(decodedToken)
    next() // Token is valid, proceed to the next middleware or route handler
  } catch (err) {
    return res.status(403).json({ message: 'Access denied. Invalid token.' })
  }
}

module.exports = { createToken, verifyToken }
