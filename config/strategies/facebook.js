'use strict';

const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require('mongoose');
const config = require("./../index");

const User = mongoose.model("User");

module.exports = ()=>{
  passport.use('facebook',new FacebookStrategy({
    // pull in our app id and secret from our environments file
    clientID: config.auth.facebookAuth.clientID,
    clientSecret: config.auth.facebookAuth.clientSecret,
    callbackURL: config.auth.facebookAuth.callbackURL,
    profileFields: ['id', 'displayName', 'picture.type(large)', 'email']
  },
   // facebook will send back the token and profile
   (token,refreshToken,profile,done)=>{
     console.log(profile);
     // asynchronous
     process.nextTick(()=>{
       User.findOne({'facebook.id':profile.id},(err,user)=>{
         // if there is an error, stop everything and return that
        // ie an error connecting to the database
         if(err){
           return done(err);
         }
        //  If user is found log them in
         if(user){
           return done(null,user);
         }else {
          //  If new user
           var newUser = new User();
          //  set all of the facebook information in our user model
           newUser.facebook.id = profile.id;
           newUser.facebook.token = token;
           newUser.facebook.name = profile.displayName;
           newUser.facebook.email = profile.emails[0].value;
           newUser.facebook.picture = profile.photos[0].value;

           console.log(`New User : ${newUser}`);

           newUser.save((err)=>{
             if (err) {
               throw err;
             }

             return done(null,newUser);
           });
         }
       });
     });
   }
));
};
