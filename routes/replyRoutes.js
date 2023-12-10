const express = require('express')
const {
  createReply,
  findReplyById,
  deleteReplyById,
  updateReplyById,
  updateReplyVote,
} = require('../controllers/replyController')
const { authorize } = require('../middleware/jwt')
const Router = express.Router()

Router.route('/').post(authorize, createReply)
Router.route('/:replyId').get(findReplyById)
Router.route('/:replyId').delete(authorize, deleteReplyById)
Router.route('/:replyId').put(authorize, updateReplyById)

// Voting System
Router.route('/:id/upvote').post(authorize, updateReplyVote)
Router.route('/:id/downvote').post(authorize, updateReplyVote)

module.exports = Router
