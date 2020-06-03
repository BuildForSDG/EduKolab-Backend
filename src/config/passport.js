// Module imports
const passport = require('passport');
const LocalStrategy = require('passport-local');

// Model imports
const Users = require('../models/Users');

// Passport setup
passport.use(
  new LocalStrategy(
    {
      usernameField: 'user[email]',
      passwordField: 'user[password]'
    },
    (email, password, done) => {
      Users.findOne({ email })
        .then((user) => {
          if (!user || !user.validatePassword(password)) {
            return done(null, false, { errors: { 'email or password': 'is invalid' } });
          }
          return done(null, user);
        })
        .catch(done);
    }
  )
);
