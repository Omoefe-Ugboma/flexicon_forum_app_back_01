// importing necessary libraries
const express = require('express')
const Router = express.Router()
const {
  makePosts,
  getPostById,
  updatePost,
  deletePost,
} = require('../controllers/postController')
const { authorize } = require('../middleware/jwt')

//creating endpoint for posts
Router.route('/').post(authorize, makePosts)

// //endpoint for getting all posts
Router.route('/:id').get(getPostById)

//updating endpoint for posts
Router.route('/:id').put(authorize, updatePost)

//deleting endpoint for posts
Router.route('/:id').delete(authorize, deletePost)

module.exports = Router
