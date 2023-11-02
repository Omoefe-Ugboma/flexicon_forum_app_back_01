const express = require('express')
const {
  createThread,
  getAllThreads,
  getThreadById,
  updateThread,
  deleteThread,
} = require('../controllers/threadController')

const Router = express.Router()

Router.route('/').post(createThread)
Router.route('/').get(getAllThreads)
Router.route('/:threadId').get(getThreadById)
Router.route('/:threadId').put(updateThread)
Router.route('/threadId').delete(deleteThread)

module.exports = Router
