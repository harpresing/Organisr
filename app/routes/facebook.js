'use strict';

const express = require('express');
const groupCtrl = require("./../controllers/group");
const auth = require("./../middleware/authentication");
const router = express.Router();

router.get("/get-group",auth.ensured,groupCtrl.getFbGroup());

module.exports = router;
