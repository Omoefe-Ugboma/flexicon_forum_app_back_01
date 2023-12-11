// utils/passport-setup.js
const passport = require('passport');
const User = require('../models/User');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    scope:[ 'https://www.googleapis.com/auth/userinfo.email'],
    // 'https://www.googleapis.com/auth/userinfo.profile',
  },
  async (accessToken, profile, done) => {
    try {
      // Check if the user already exists based on Google ID
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        // If the user doesn't exist, create a new user using Google profile information
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value, // Assuming you have access to user's email
         
        });
      }

      // Save or update Google OAuth tokens
      user.googleToken = accessToken;
      await user.save();

      // Return the user object
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

module.exports = {
  passport
//   authorize,
};
