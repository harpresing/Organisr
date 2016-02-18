'use strict';

const LEN = 256;
const SALT_LEN = 64;
const ITERATIONS = 10000;
const DIGEST = 'sha256';
const crypto = require('crypto');

function hashPassword(password,salt,callback) {
  var len = LEN / 2;

  if (3 === arguments.length) {
    crypto.pbkdf2(password, salt, ITERATIONS, len, DIGEST, function(err, derivedKey) {
      if (err) {
        return callback(err);
      }

      return callback(null, derivedKey.toString('hex'));
    });
  } else {
    callback = salt;
    crypto.randomBytes(SALT_LEN / 2, function(err, salt) {
      if (err) {
        return callback(err);
      }

      salt = salt.toString('hex');
      crypto.pbkdf2(password, salt, ITERATIONS, len, DIGEST, function(err, derivedKey) {
        if (err) {
          return callback(err);
        }

        callback(null, derivedKey.toString('hex'), salt);
      });
    });
  }
}

/**
 * Verifies if a password matches a hash by hashing the password
 * with a given salt
 *
 * @param {String} password
 * @param {String} hash
 * @param {String} salt
 * @param {Function} callback
 */
function verify(password, hash, salt, callback) {
  hashPassword(password, salt, function(err, hashedPassword) {
    if (err) {
      return callback(err);
    }

    if (hashedPassword === hash) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  });
}

module.exports.hash = hashPassword;
module.exports.verify = verify;
