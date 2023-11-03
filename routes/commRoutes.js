const express = require('express')

//router to define routes
const Router = express.Router()

//import from Community model
const {
    getComms,
    createComm,
    getAComm,
    updateComm,
    deleteComm
    } = require('../controllers/community')

//exposing community endpoints
Router.route('/').get(getComms).post(createComm)
Router.route('/:id').get(getAComm).patch(updateComm).delete(deleteComm)

module.exports = Router

