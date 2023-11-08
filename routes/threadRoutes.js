const express = require('express')
const {
  createThread,
  getAllThreads,
  getThreadById,
  deleteThread,
} = require('../controllers/threadController')
const { authorize } = require('../middleware/jwt')

const Router = express.Router()

Router.route('/').post(authorize, createThread)
Router.route('/').get(getAllThreads)
Router.route('/:threadId').get(getThreadById)
Router.route('/:threadId').delete(authorize, deleteThread)

module.exports = Router
