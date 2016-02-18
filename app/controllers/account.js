'use strict';
// For signing up new users

const _ = require('lodash');
const mongoose = require('mongoose');
const User = mongoose.model('User');


function signupUser(req,res) {
  req.session.historyData = _.omit(req.body, 'password');//Don't save the password as plain text

  if (!req.body.email) {
    req.session.historyData.message = 'E-mail is required.';
    return res.redirect('login');
  }

  if (!req.body.password) {
    req.session.historyData.message = 'Password is required.';
    return res.redirect('signup');
  }

  if (req.body.password !== req.body.password_confirm) {
    req.session.historyData.message = 'Password confirmation should match password.';
    return res.redirect('signup');
  }

  const userData = _.pick(req.body,'name','email','password');
  User.register(userData,(err,user)=>{
    if (err && (11000 === err.code || 11001 === err.code)) {
      req.session.historyData.message = 'E-mail is already in use.';
      return res.redirect('signup');
    }

    if (err) {
      req.session.historyData.message = 'Something went wrong, please try later.';
      return res.redirect('signup');
    }

    req.logIn(user,()=>{
      delete req.session.historyData;
      res.redirect('/');
    });
  });
}

/**
 *  Module exports
 */
module.exports.signup = signupUser;
