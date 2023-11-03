const Thread = require('../models/Thread')
const User = require('../models/User')

const createThread = async (req, res) => {
  const userId = req.user.userId
  const user = await User.findById(userId)

  const thread = new Thread({
    Creator: user,
    posts: [],
    replies: [],
  })

  try {
    const savedThread = await thread.save() // save the thread in the database
    user.activity.threads.push(savedThread) // update user activity with new thread
    await user.save() // save updated user
    res.status(201).json(savedThread)
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

const getAllThreads = async (req, res) => {
  try {
    const threads = await Thread.find()
    res.json(threads)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching threads' })
  }
}

const getThreadById = async (req, res) => {
  const threadId = req.params.threadId
  try {
    const thread = await Thread.findById(threadId)
    if (thread) {
      res.json(thread)
    } else {
      res.status(404).json({ message: 'Thread not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching thread' })
  }
}

const deleteThread = async (req, res) => {
  const threadId = req.params.threadId
  Thread.findByIdAndDelete(threadId)
    .then(thread => {
      if (!thread) return res.status(404).json({ message: 'Thread not found' })
      console.log(thread)
      res.json({ message: 'Thread deleted' })
    })
    .catch(error => {
      res.status(500).json({ message: error.message })
    })
}

module.exports = {
  createThread,
  getAllThreads,
  getThreadById,
  deleteThread,
}
