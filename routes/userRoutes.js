const express = require('express')

const { signup, login, addToBlacklist } = require('../controllers/authController')
const { authorize } = require('../middleware/jwt')

//router to define routes
const Router = express.Router()

//exposing signup endpoint
Router.route('/v1/signup').post(signup)

//exposing login endpoint
Router.route('/v1/login').post(login)

//exposing logout endpoint
Router.route('/v1/logout').delete(addToBlacklist)

//exporting router middleware
module.exports = Router
