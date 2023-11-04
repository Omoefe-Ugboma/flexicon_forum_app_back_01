// importing necessary libraries
const express = require('express')
const Router = express.Router()
const {
  makePosts,
  getPostById,
  updatePost,
  deletePost,
} = require('../controllers/postController')

//creating endpoint for posts
Router.route('/').post(makePosts)

// //endpoint for getting all posts
Router.route('/:id').get(getPostById)

//updating endpoint for posts
Router.route('/:id').put(updatePost)

//deleting endpoint for posts
Router.route('/:id').delete(deletePost)

module.exports = Router
