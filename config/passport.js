'use strict';

const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

/*eslint-disable */
module.exports.init = function(app) {
/*eslint-enable */
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, done);
  });

  // load strategies
  require('./strategies/local')();
};
