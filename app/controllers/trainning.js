'use strict';

const Training  = require("./../models/training");
class TrainingController {
  createSession(){
    return (req,res)=>{
      Training.create(req.body,(err)=>{
        if(err){
          throw err;
        }
        console.log("Trainning Session Saved");
        res.send("Session Created!!!");
      });
    };
  }
  getSessions(){
      return (req, res)=> {
        Training.find(function(err, sessions) {
          if (err)
            res.send(err);
          res.json(sessions);
        });
      };
    }
}



module.exports = new TrainingController();
