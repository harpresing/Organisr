"use strict";
const express = require("express");
const mainCtrl = require('./../controllers/main');
const authCtrl = require("./../controllers/authentication");
const auth = require('./../middleware/authentication');
const accountCtrl = require('./../controllers/account');
const emailCredCtrl = require('./../controllers/emailCredController')
const router = express.Router();

router.get('/',(req,res)=>{
  res.render('index',{title:"Organisr",currentUser:req.user});
});

router.get("/login",(req,res)=>{
  res.render('login');

});

router.post('/login', authCtrl.signin);
router.post('/signup',accountCtrl.signup);
router.get('/logout', authCtrl.signout);

router.get("/dashboard",auth.ensured,(req,res)=>{
  res.render('dashboard',{user:req.user});
});

router.post('/emailSignUp', emailCredCtrl.createEmailUser());
module.exports = router;
