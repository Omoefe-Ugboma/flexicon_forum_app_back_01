const express = require('express')
const passport = require('passport')
const { signup, login, addToBlacklist } = require('../controllers/authController')
const {createToken} = require('../middleware/jwt')
const { authorize } = require('../middleware/jwt')

//router to define routes
const Router = express.Router()

//exposing signup endpoint
Router.route('/v1/signup').post(signup)

//exposing login endpoint
Router.route('/v1/login').post(login)

//exposing logout endpoint
Router.route('/v1/logout').delete(addToBlacklist)

// Google OAuth route
Router.route('/auth/google').get(passport.authenticate('google', { scope: ['profile', 'email'] }));

Router.route('/auth/google/secrets').get(passport.authenticate('google', { failureRedirect: '/' }),
async (req, res) => {
    try {
      // Successful authentication, generate a token using your custom function
      const token = await createToken(req.user.id);
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error generating token' });
    }
  }
);
//exporting router middleware
module.exports = Router
