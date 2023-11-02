// importing necessary libraries
const express = require('express')
const Router = express.Router()
const {makePosts,getPostById,updatePost,deletePost} = require('../controllers/posts')


//creating endpoint for posts
Router.route('/').post(makePosts)


// //endpoint for getting all posts
Router.route('/:id').get(getPostById)

//updating endpoint for posts
Router.route('/:d').post(updatePost)

//deleting endpoint for posts
Router.route('/:id').post(deletePost)



module.exports = Router