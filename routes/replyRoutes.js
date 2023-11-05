const express = require('express');
const {createReply,findReplyById,deleteReplyById,updateReplyById} =require('../controllers/replyController');
const Router = express.Router();


Router.route('/').post(createReply);
Router.route('/:replyId').get(findReplyById);
Router.route('/:replyId').delete(deleteReplyById);
Router.route('/:replyId').put(updateReplyById);
module.exports = Router