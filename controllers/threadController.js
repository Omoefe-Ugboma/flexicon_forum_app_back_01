const Thread = require('../models/Thread')
const User = require('../models/User')

const createThread = async (req, res) => {
  const userId = req.user.userId
  const user = await User.findById({ _id: userId })

  const thread = new Thread({
    Creator: user,
    posts: [],
    replies: [],
  })

  const savedThread = await thread.save()
  console.log(savedThread)
  res.json(savedThread)
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

const updateThread = (req, res) => {}

const deleteThread = (req, res) => {}

module.exports = {
  createThread,
  getAllThreads,
  getThreadById,
  updateThread,
  deleteThread,
}
