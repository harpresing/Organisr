'use strict';

/**
 *  Module dependencies
 */
const passport = require('passport');
// const mongoose = require('mongoose');


/**
 *  Uses Passport's local strategy to sign in a user
 */
function signinUser(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    console.log("Error" + err);
    console.log("User" + user);
    if (err || !user) {
      return res.format({
        html: function() {
          req.session.historyData = info;
          res.redirect('/login');
        },
        // just in case :)
        text: function() {
          req.session.historyData = info;
          res.redirect('/login');
        },
        json: function() {
          res.status(400).json(info);
        }
      });
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

      res.format({
        html: function() {
          delete req.session.historyData;
          res.redirect('/dashboard');
        },
        // just in case :)
        text: function() {
          delete req.session.historyData;
          res.redirect('/');
        },
        json: function() {
          delete req.session.historyData;
          res.status(200).json(user);
        }
      });
    });
  })(req, res, next);
}

function signoutUser(req, res) {
  req.logout();
  delete req.session.historyData;
  res.redirect('/');
}
/**
*  Module exports
*/
module.exports.signin = signinUser;
module.exports.signout = signoutUser;
