// Import the required models
const Thread = require('../models/Thread')
const User = require('../models/User')

// Function to create a new thread
const createThread = async (req, res) => {
  // Get the user ID from the request object
  const userId = req.user.userId
  // Find the user by their ID
  const user = await User.findById(userId)
  if (!user) {
    // If the user does not exist, send a 404 status code and a message
    return res.status(404).json({ message: 'User not found' })
  }

  // Create a new thread instance with the user as the creator and empty posts and replies arrays
  const thread = new Thread({
    Creator: user,
    posts: [],
    replies: [],
  })

  try {
    // Save the new thread to the database
    const savedThread = await thread.save()
    // Add the new thread to the user's activity array
    user.activity.threads.push(savedThread)
    // Save the updated user to the database
    await user.save()
    // Send the saved thread as a JSON response with a 201 status code
    res.status(201).json(savedThread)
  } catch (err) {
    // Handle any errors by sending a 500 status code and an error message
    return res.status(500).json(err.message)
  }
}

// Function to get all threads
const getAllThreads = async (req, res) => {
  try {
    // Find all threads in the database
    const threads = await Thread.find()
    // Send the threads as a JSON response with a 200 status code
    res.status(200).json(threads)
  } catch (error) {
    // Handle any errors by sending a 500 status code and an error message
    res.status(500).json({ message: 'Error fetching threads' })
  }
}

// Function to get a thread by its ID
const getThreadById = async (req, res) => {
  // Get the thread ID from the request parameters
  const threadId = req.params.threadId
  try {
    // Find the thread by its ID
    const thread = await Thread.findById(threadId)
    if (!thread) {
      // If the thread does not exist, send a 404 status code and a message
      res.status(404).json({ message: 'Thread not found' })
    }
    // Send the thread as a JSON response with a 200 status code
    res.status(200).json(thread)
  } catch (error) {
    // Handle any errors by sending a 500 status code and an error message
    res.status(500).json({ message: 'Error fetching thread' })
  }
}

// Function to delete a thread
const deleteThread = async (req, res) => {
  // Get the thread ID from the request parameters
  const threadId = req.params.threadId
  // Find and delete the thread by its ID
  Thread.findByIdAndDelete(threadId)
    .then(thread => {
      if (!thread) {
        // If the thread does not exist, send a 404 status code and a message
        return res.status(404).json({ message: 'Thread not found' })
      }
      // Send a success message as a JSON response
      res.json({ message: 'Thread deleted' })
    })
    .catch(error => {
      // Handle any errors by sending a 500 status code and an error message
      res.status(500).json({ message: error.message })
    })
}

// Export the functions as a module
module.exports = {
  createThread,
  getAllThreads,
  getThreadById,
  deleteThread,
}
