"use strict";
const express = require("express");
const mainCtrl = require('./../controllers/main');
const authCtrl = require("./../controllers/authentication");
const auth = require('./../middleware/authentication');
const accountCtrl = require('./../controllers/account');
const trainingCtrl = require("./../controllers/training");
const router = express.Router();

router.get('/',(req,res)=>{
  res.render('index',{title:"Organisr",currentUser:req.user});
});

/*router.get("/login",(req,res)=>{
  res.render('login');

});
*/
//router.post('/login', authCtrl.signin);
router.post('/signup',accountCtrl.signup);
router.get('/logout', authCtrl.signout);

router.get("/dashboard",auth.ensured,mainCtrl.showPage("dashboard"));
router.get("/get-training-sessions",auth.ensured,trainingCtrl.getSessions());
router.get("/terms-and-conditions",mainCtrl.showPage("terms_of_use"));
router.get("/support",mainCtrl.showPage("support"));


router.get('/session/:id',trainingCtrl.getSessionPage());

module.exports = router;
