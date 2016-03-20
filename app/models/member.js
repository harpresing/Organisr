'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const _ = require("lodash");

var MemberSchema = new Schema({
  memberID: String,
  groupID: String,
  administrator: Boolean,
  name: String
});

MemberSchema.statics.assignNewMember = function (opts){
  var self = this;
  var data = _.cloneDeep(opts);
  self.findOne({memberID:data.memberID,groupID:data.groupID},(findErr,member)=>{
    if(!member){
      console.log("Created");
      self.model("Member").create(data);
    }
  });
};

MemberSchema.statics.findGroups = function (id, callback) {
  getGroupIds(this,id,(err,groupIDs)=>{
    mongoose.model('Group').find({_id:{$in:groupIDs}},(err,groups)=>{
      if(err) callback(err);
      callback(err,groups);
    });
  });
};

function getGroupIds(self,id, cb) {
  self.find({memberID:id},(findErr,members)=>{
    const groupIDs = members.map((member)=>{return member.groupID;});
    cb(findErr,groupIDs);
    });
}
module.exports =  mongoose.model('Member', MemberSchema);
