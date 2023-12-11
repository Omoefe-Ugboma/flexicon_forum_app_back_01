const express = require('express')

//router to define routes
const Router = express.Router()

//import from Community model
const {
  getComms,
  createComm,
  getAComm,
  updateComm,
  deleteComm,
} = require('../controllers/commController')
const { authorize } = require('../middleware/jwt')

//exposing community endpoints
Router.route('/').get(getComms).post(authorize, createComm)
Router.route('/:id')
  .get(getAComm)
  .patch(authorize, updateComm)
  .delete(authorize, deleteComm)

module.exports = Router
