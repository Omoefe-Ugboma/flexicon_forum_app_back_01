const express = require('express')
const {
  createThread,
  getAllThreads,
  getThreadById,
  deleteThread,
} = require('../controllers/threadController')

const Router = express.Router()

Router.route('/').post(createThread)
Router.route('/').get(getAllThreads)
Router.route('/:threadId').get(getThreadById)
Router.route('/:threadId').delete(deleteThread)

module.exports = Router
