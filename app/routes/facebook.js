'use strict';

const express = require('express');
const groupCtrl = require("./../controllers/group");
const auth = require("./../middleware/authentication");
const router = express.Router();

router.get("/get-groups",auth.ensured,groupCtrl.getFBGroups());
router.get("/set-user-admin-groups",auth.ensured,groupCtrl.setFBGroup());

module.exports = router;
