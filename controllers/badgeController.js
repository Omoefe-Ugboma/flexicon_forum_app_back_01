const Badge = require('../models/Badge')

// Define a function to create a new badge
const createBadge = async (req, res) => {
  const {name, criteria} = req.body

  try {
    // Check if the badge exists by name
    const badge = await Badge.findOne({ name });
    if (badge){
      return res.json({badge, message: 'Badge already exists'})
    }
    const newBadge = await Badge.create({name, criteria})
    res.status(201).json(newBadge)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

module.exports = createBadge