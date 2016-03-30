'use strict';

const Training  = require("./../models/training");
const Group = require("./../models/group");
const Member = require('./../models/member');

class TrainingController {
  createSession(){
    return (req,res)=>{
      Training.create(req.body,(err,training)=>{
        if(err){
          res.send({
            error:true,
            message: "Your trainning session is forgetting important information."
          });
        }
        console.log("Trainning Session Saved");
        res.send(training);
      });
    };
  }
  getSessions(){
      return (req, res)=> {
        Member.findGroups(req.user.facebook.id,(memErr,groups)=>{
          const groupIds = groups.map((g) => {return g._id;});
          Group.getAssociatedTrainningSessions(groupIds,(err,sessions)=>{
            if (err){
              res.send(err);
            }
            res.json(sessions);
          });
        });
        // Training.getAffiliatedSession(req.user.facebook.id,function(err, sessions) {
        //   if (err)
        //     res.send(err);
        //     console.log(sessions);
        //   res.json(sessions);
        // });
      };
  }

  getSessionPage(){
    return (req,res)=>{
      Training.find({_id:req.params.id},(err,session)=>{
        res.render('training',{session:session});
      });
    };
  }
}



module.exports = new TrainingController();
