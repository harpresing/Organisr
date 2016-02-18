// //connection
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');
//
//
//
// //insert user's credentials
// function insertCred(userId, passw) {
// 	var Schema =  new mongoose.Schema({_id: String, username:String, Password: String}, { _id: false });
// 	var user = mongoose.model('user', Schema);
// 	var u = new user({_id:userId, 	username:userId, 	Password:passw });
// 	u.save(function(err){
// 		if(err){
// 			console.log(err);
// 		}
// 		console.log("User's credentials inserted");
// 	});
// }
//
//
// //insert product document
// function insertProd(category, name) {
// 	var Schema =  new mongoose.Schema({_id: String, product:{_attributes:{category:String}, _children:[{name:{_children:String}}]}}, { _id: false });
// 	var prod = mongoose.model('product', Schema);
// 	var p = new prod({_id: category+name, product:{_attributes:{category:category}, _children:[{name:{_children:name}}]}});
// 	p.save(function(err){
// 		if(err){
// 			console.log(err);
// 		}
// 		console.log("Product added");
// 	});
// }
//
//
// var Schema =  new mongoose.Schema({_id: String, username:String, Password: String}, { _id: false });
// var user = mongoose.model('user', Schema);
// user.findOne({username: "stephen"}, function(err, document) {
//     console.log(document);
//  });
