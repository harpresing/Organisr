'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const _ = require("lodash");

var AdminSchema = new Schema({
  adminID: String,
  groupID: String,
  name: String
});

AdminSchema.statics.assignNewAdmin = function (opts){
  var self = this;
  var data = _.cloneDeep(opts);

  self.findOne({adminID:data.userID,groupID:data.groupID},(findErr,admin)=>{
    if(admin){
      console.log("Found");
    }else{
      self.model("Admin").create({adminID:data.userID,groupID:data.groupID,name:data.name});
    }
  });
};
module.exports =  mongoose.model('Admin', AdminSchema);
