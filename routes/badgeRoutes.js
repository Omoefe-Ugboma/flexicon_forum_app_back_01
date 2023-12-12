const express = require('express')
const { authorize } = require('../middleware/jwt')
const createBadge = require('../controllers/badgeController')

// Router to define routes
const Router = express.Router()

// exposing badge endpoints
Router.route('/').post(createBadge)

module.exports = Router