'use strict';

const mongoose = require('mongoose');
const passwordHelper = require('../helpers/password');
const Schema = mongoose.Schema;
const _ = require('lodash');

var UserSchema = new Schema({
  local : {
    email:  {
      type: String
    },
    name: {
      type: String
    },
    password: {
      type: String,
      select: false
    },
    passwordSalt: {
      type: String,
      select: false
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  facebook: {
    id : String,
    token : String,
    email : String,
    name : String,
    picture: String
  }
});

/**
 * Find a user by it's email and checks the password againts the stored hash
 *
 * @param {String} email
 * @param {String password
 * @param {Function} callback
 */
UserSchema.statics.authenticate = function(email, password, callback) {
  this.findOne({'local.email': email }).select('+local.password +local.passwordSalt').exec(function(err, user) {
    if (err) {
      return callback(err, null);
    }

    // no user found just return the empty user
    if (!user) {
      return callback(err, user);
    }

    // verify the password with the existing hash from the user
    passwordHelper.verify(password, user.local.password, user.local.passwordSalt, function(err, result) {
      if (err) {
        return callback(err, null);
      }

      // if password does not match don't return user
      if (result === false) {
        return callback(err, null);
      }

      // remove password and salt from the result
      user.password = undefined;
      user.passwordSalt = undefined;
      // return user if everything is ok
      callback(err, user);
    });
  });
};

/**
 * Create a new user with the specified properties
 *
 * @param {Object} opts - user data
 * @param {Function} callback
 */
UserSchema.statics.register = function(opts, callback) {
  var self = this;
  var data = _.cloneDeep(opts);

  self.model('User').findOne({'local.email':data.email},(err,user)=>{
    if (user) {
      err ={code:11000};
      callback(err);
    }else {
      //hash the password
      passwordHelper.hash(opts.password, function(err, hashedPassword, salt) {
        if (err) {
          return callback(err);
        }

        data.password = hashedPassword;
        data.passwordSalt = salt;
        data = {local:data};
        //create the user
        self.model('User').create(data, function(err, user) {
          if (err) {
            return callback(err, null);
          }

          // remove password and salt from the result
          user.local.password = undefined;
          user.local.passwordSalt = undefined;
          // return user if everything is ok
          callback(err, user);
        });
      });
    }
  });
};

/**
 * Create an instance method to change password
 *
 */
UserSchema.methods.changePassword = function(oldPassword, newPassword, callback) {
  var self = this;

  // get the user from db with password and salt
  self.model('User').findById(self.id).select('+password +passwordSalt').exec(function(err, user) {
    if (err) {
      return callback(err, null);
    }

    // no user found just return the empty user
    if (!user) {
      return callback(err, user);
    }

    passwordHelper.verify(oldPassword, user.local.password, user.local.passwordSalt, function(err, result) {
      if (err) {
        return callback(err, null);
      }

      // if password does not match don't return user
      if (result === false) {
        var PassNoMatchError = new Error('Old password does not match.');
        PassNoMatchError.type = 'old_password_does_not_match';
        return callback(PassNoMatchError, null);
      }

      // generate the new password and save the changes
      passwordHelper.hash(newPassword, (err, hashedPassword, salt) =>{
        self.local.password = hashedPassword;
        self.local.passwordSalt = salt;

        self.save(function(err) {
          if (err) {
            return callback(err, null);
          }

          if (callback) {
            return callback(err, {
              success: true,
              message: 'Password changed successfully.',
              type: 'password_change_success'
            });
          }
        });
      });
    });
  });
};
// compile User model
module.exports = mongoose.model('User', UserSchema);
