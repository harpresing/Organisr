'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const _ = require("lodash");

var GroupSchema = new Schema({
  _id:{
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String
  },
  icon: {
    type: String
  },
  link: {
    type: String
  }
});

GroupSchema.statics.add = function (opts,callback){
  var self = this;
  var data = _.cloneDeep(opts);
  Object.assign(data,{_id:data.id});
  self.model("Group").create(data,(err,group)=>{
    if(err){
      return callback(err,null);
    }
    callback(err,group);
  });
};

GroupSchema.statics.findGroup = function(groupID,callback){
  var self = this;

  self.model("Group").find({_id:groupID},(err,group)=>{
    if(err){
      return callback(err,null);
    }
    callback(err,group);
  });
};

module.exports = mongoose.model('Group', GroupSchema);
// mongoose.connect("mongodb://localhost/organisr-dev");
// var Group = mongoose.model('Group', GroupSchema);
//
// const groupData ={
//   _id:"123456789",
//   name:"DUHAC",
//   icon:"https://wwww.facebook.jpg",
//   link:"https://www.google.com"
// };
//
// Group.add(groupData,(err,group)=>{
//   if(err){
//     console.log(`Something went wrong ${err}`);
//   }
//   console.log(`Saved ${group}`);
// });
//
// Group.findGroup("123456789",(err,group)=>{
//   if(err){
//     console.log(`Something went wrong ${err}`);
//   }
//   console.log(`Found ${group}`);
// });
