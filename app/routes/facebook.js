'use strict';

const express = require('express');
const groupCtrl = require("./../controllers/group");
const auth = require("./../middleware/authentication");
const router = express.Router();

router.get("/get-group",auth.ensured,groupCtrl.setFBGroup());
router.get("/set-user-admin-groups",groupCtrl.setFBGroup());

module.exports = router;
