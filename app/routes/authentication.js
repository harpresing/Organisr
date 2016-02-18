'use strict';

const express = require('express');
const router = express.Router();
const authCtrl = require('./../controllers/authentication');

router.post('/login',authCtrl.signin);
router.get('/logout',authCtrl.signout);

module.exports = router;
