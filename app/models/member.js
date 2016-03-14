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

  self.findOne({memberID:data.userID,groupID:data.groupID},(findErr,admin)=>{
    if(admin){
      console.log("Found");
    }else{
      self.model("Member").create(data);
    }
  });
};
module.exports =  mongoose.model('Member', MemberSchema);
