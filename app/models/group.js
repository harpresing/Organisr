'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const _ = require("lodash");
const objectAssign = require("object-assign");
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

GroupSchema.statics.register = function (opts,callback){
  var self = this;
  var data = _.cloneDeep(opts);
  Object.assign(data,{_id:data.id});

  self.findOne({_id:data._id},(findErr,group)=>{
    if (findErr) {
      callback(findErr);
    } else if(group){
      callback(findErr,group);
    }else{
      self.model("Group").create(data,(createErr,newGroup)=>{
        if(createErr){
          return callback(createErr,null);
        }
        callback(createErr,newGroup);
      });
    }
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

GroupSchema.statics.getAssociatedTrainningSessions = function(ids,callback){
  var self = this;
  self.find({_id:{$in:ids}},(groupErr,groups)=>{
    if(groupErr)callback(groupErr,null);
    const groupIds = groups.map((g) => {return g._id;});
    mongoose.model('Training').find({groupID:{$in:groupIds}},(err,sessions)=>{
      const results = groups.map((group) => {
         const groupSessions = sessions.filter((session) => {return session.groupID == group._id;});
         return {
           group: group,
           sessions:groupSessions
         };
      });
      callback(groupErr,results);
    });
  });
};
module.exports = mongoose.model('Group', GroupSchema);
