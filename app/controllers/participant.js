'use strict';

const Participant = require("./../models/participant");

class ParticipantController {
  joinSession(){
    return (req,res)=>{
      const data = {
        userId: req.user.facebook.id,
        sessionId: req.body.sessionId
      };
      Participant.joinSession(data,(err,participant)=>{
        if(err){
          res.send(err);
        }
        res.json("Joined");
      });
    };
  }

  leaveSession() {
    return (req,res)=>{
      const data = {
        userId: req.user.facebook.id,
        sessionId: req.body.sessionId
      };
      Participant.findOne(data,(findErr,participant)=>{
        Participant.remove(participant,(remErr)=>{
          if (remErr) {
            res.send(remErr);
          }
          res.send("Removed");
        });
      });
    };
  }

  getParticipants(){
    return(req,res)=>{
      Participant.find({sessionId: req.query.sessionId},(err,participants)=>{
        res.json({participants:participants,userId: req.user.facebook.id});
      });
    };
  }
}

module.exports = new ParticipantController();
