const User = require('../models/User')
const { createToken } = require('../middleware/jwt')
const BlackList = require('../models/Blacklist')

// Define a function to handle user sign-up
const signup = async (req, res) => {
  try {
    const { email, password } = req.body

    //check if email and password were inputted
    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: 'Please provide your user credentials' })
    }

    //validate email
    const checkEmail = await User.findOne({ email })
    if (checkEmail) {
      return res.status(409).json({ msg: 'Email already exists' })
    }

    // Create a new user and generate a token
    const user = await User.create(req.body)
    const accessToken = await createToken(user._id)

    return res.status(201).json({ accessToken })
  } catch (error) {
    // Handle errors
    res.status(500).json({ msg: error.message })
  }
}

// Define a function to handle user login
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if email and password were inputted
    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: 'Please provide your user credentials' })
    }

    // Find the user with the given email
    const user = await User.findOne({ email })

    // If the user does not exist, return an error message
    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials' })
    }

    // Compare the password with the stored hash
    const passwordMatch = await user.comparePassword(password)

    // If the password does not match, return an error message
    if (!passwordMatch) {
      return res.status(401).json({ msg: 'Invalid credentials' })
    }

    // Generate a token and send it in the response
    const accessToken = await createToken(user._id)
    return res.status(200).json({ accessToken })
  } catch (error) {
    // Handle errors
    res.status(500).json({ msg: error.message })
  }
}
const addToBlacklist = async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const token = req.header('Authorization').substring(7);

    // Create a new BlackList document with the extracted token
    const blacklist = new BlackList({
      token: token
    });

    // Save the BlackList document to the database
    await blacklist.save();

    // Return a success message if the token is added to the blacklist successfully
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    // Handle any errors that occur during the process
    return res.status(500).json({ message: 'Error logging out successfully', error: err.message });
  }
};


module.exports = { signup, login ,addToBlacklist}
