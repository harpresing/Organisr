'use strict';

class TrainingController {
  createSession(){
    return (req,res)=>{
      console.log("Invoked");
      console.log(req.body);
      res.json(req.body);
    };
  }
}


module.exports = new TrainingController();
