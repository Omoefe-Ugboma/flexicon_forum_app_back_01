const Jwt = require('jsonwebtoken')

// Verify user's access token
const verifyUser = async (req, res, next) => {
  const token = req.header('Authorization').substring(7)
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token missing.' })
  }

  // Token verification
  try {
    const decodedToken = Jwt.verify(token, process.env.JWT_SECRET)
    req.user = decodedToken // Store the decoded token in the request for further use
    next() // Token is valid, proceed to the next middleware or route handler
  } catch (err) {
    return res.status(403).json({ message: 'Access denied. Invalid token.' })
  }
}

module.exports = { verifyUser }
