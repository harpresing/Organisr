'use strict';

const EmailUser = require('./../models/emailCredential');

function createEmailUser () {
	return (req,res)=>{
		var username = req.body.username;
		var password = req.body.password;
		var confirmPassword = req.body.confirmPassword;

		var user = new EmailUser({
		   username: username,
		   password: password,
		   confirmPassword: password	
		});
		res.send(user);
		user.save(function(err){
			if (err){
				console.log(err);
			}
			console.log("Account Created");
		});
	};
}

module.exports.createEmailUser = createEmailUser; 