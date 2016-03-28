const express = require('express');
const auth = require("./../middleware/authentication");
const participantCtrl = require("./../controllers/participant");
const router = express.Router();

router.post("/join-session",auth.ensured,participantCtrl.joinSession());
router.post("/leave-session",auth.ensured,participantCtrl.leaveSession());
router.get("/get-all",auth.ensured,participantCtrl.getParticipants());

module.exports = router;
