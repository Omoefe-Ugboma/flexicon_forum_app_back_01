const express = require('express')

const {signup, login} = require('../controllers/authentication')

//router to define routes
const Router = express.Router()

//exposing signup endpoint
Router.route('/v1/signup').post(signup)

//exposing login endpoint
Router.route('/v1/login').post(login)


//exporting router middleware
module.exports = Router