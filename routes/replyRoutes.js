const express = require('express');
const {createReply} =require('../controllers/replies');
const Router = express.Router();


Router.route('/').post(createReply);

module.exports = Router