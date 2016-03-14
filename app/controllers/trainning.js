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
}


module.exports = new TrainingController();
