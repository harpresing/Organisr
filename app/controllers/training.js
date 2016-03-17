'use strict';

const Training  = require("./../models/training");
class TrainingController {
  createSession(){
    return (req,res)=>{
      Training.create(req.body,(err,training)=>{
        if(err){
          throw err;
        }
        console.log("Trainning Session Saved");
        res.send(training);
      });
    };
  }
  getSessions(){
      return (req, res)=> {
        console.log(req.user.facebook);
        Training.getAffiliatedSession(req.user.facebook.id,function(err, sessions) {
          if (err)
            res.send(err);
          res.json(sessions);
        });
      };
    }
}



module.exports = new TrainingController();
