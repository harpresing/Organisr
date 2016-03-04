'use strict';
// For signing up new users

const _ = require('lodash');
const mongoose = require('mongoose');
const User = mongoose.model('User');


function signupUser(req,res) {
  req.session.historyData = _.omit(req.body, 'password');//Don't save the password as plain text
  console.log("Invoked");
  if (!req.body.email) {
    req.session.historyData.message = 'E-mail is required.';
    console.log("No email");
    return res.redirect('login');
  }

  if (!req.body.email) {
    req.session.historyData.message = 'First and last name is required.';
    console.log("No first or last name");
    return res.redirect('login');
  }

  if (!req.body.first_name && !req.body.last_name) {
    req.session.historyData.message = 'Password is required.';
    console.log("No password");
    return res.redirect('login');
  }

  if (req.body.password !== req.body.password_confirm) {
    req.session.historyData.message = 'Password confirmation should match password.';
    console.log("Passwords Not matching");
    return res.redirect('login');
  }

  Object.assign(req.body,{name:`${req.body.first_name} ${req.body.last_name}`});
  const userData = _.pick(req.body,'name','email','password');
  User.register(userData,(err,user)=>{
    if (err && (11000 === err.code || 11001 === err.code)) {
      req.session.historyData.message = 'E-mail is already in use.';
      console.log("Email in use");
      return res.redirect('login');
    }

    if (err) {
      req.session.historyData.message = 'Something went wrong, please try later.';
      return res.redirect('login');
    }

    req.logIn(user,()=>{
      delete req.session.historyData;
      res.redirect('/dashboard');
    });
  });
}

/**
 *  Module exports
 */
module.exports.signup = signupUser;
