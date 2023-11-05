const express = require('express');
const {createReply,findReplyById,deleteReplyById} =require('../controllers/replyController');
const Router = express.Router();


Router.route('/').post(createReply);
Router.route('/:replyId').get(findReplyById);
Router.route('/:replyId').delete(deleteReplyById);
module.exports = Router