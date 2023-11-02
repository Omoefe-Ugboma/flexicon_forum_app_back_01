// importing necessary libraries
const express = require('express')
const Router = express.Router()
const {makePosts,getPostById} = require('../controllers/posts')


//creating endpoint for posts
Router.route('/').post(makePosts)


// //endpoint for getting all posts
Router.route('/:id').get(getPostById)


module.exports = Router