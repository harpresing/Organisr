'use strict';

const express = require('express');
const router = express.Router();
const authCtrl = require('./../controllers/authentication');
var passport = require('passport');
//Local
router.post('/login',authCtrl.signin);
router.get('/logout',authCtrl.signout);


//Facebook
router.get('/auth/facebook',authCtrl.signinFacebook());
router.get('/auth/facebook/callback',authCtrl.facebookCallback());

module.exports = router;
