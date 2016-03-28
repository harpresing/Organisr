'use strict';

//connecting to mongoose DB
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Trainings Schema
var ParticipantSchema = new Schema({
  userId : {
    type : String,
    required : "Member Id is missing"
  },
  sessionId : {
    type : String,
    required : "Training Id is missing"
  },
  joinedOn : {
    type : Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

ParticipantSchema.statics.joinSession = function (data,callback){
  var self = this;

  self.findOne(data,(findErr,participant)=>{
    if(!participant){
      self.model("Participant").create(data,(createErr,p)=>{
        callback(createErr,p);
      });
    }else{
      callback({message:"Already Joined"});
    }
  });
};
module.exports = mongoose.model('Participant', ParticipantSchema);
