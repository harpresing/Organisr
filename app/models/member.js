'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Group = require("./group");
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
  self.findOne({memberID:data.memberID,groupID:data.groupID},(findErr,admin)=>{
    if(admin){
      console.log("Found");
      console.log(admin);
    }else{
      console.log("Created");
      self.model("Member").create(data);
    }
  });
};

MemberSchema.statics.findGroups = function (id, callback) {
  getGroupIds(this,id,(err,groupIDs)=>{
    Group.find({_id:{$in:groupIDs}},(err,groups)=>{
      if(err) callback(err);
      console.log(groups);
      callback(err,groups);
    });
  });
};

function getGroupIds(self,id, cb) {
  self.find({memberID:id},(findErr,members)=>{
    const groupIDs = members.map((member)=>{return member.groupID;});
    console.log("Hello");
    console.log(members);
    cb(findErr,groupIDs);
    });
}
module.exports =  mongoose.model('Member', MemberSchema);
