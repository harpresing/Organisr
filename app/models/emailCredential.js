'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var emailCredential = new Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
        required: true 
	},
	confirmPassword: {
		type: String,
		required: true
	}
});

var user = mongoose.model('EmailSignUp', emailCredential);
module.exports = user;