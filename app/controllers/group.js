'use strict';

const FB = require("fb");
const Group = require("./../models/group");
const Admin = require("./../models/admin");
FB.options({version: 'v2.5'});

function setGroup(){
  return (req,res)=>{
    FB.setAccessToken(req.user.facebook.token);

    FB.api("me/groups",{},(fbRes)=>{

      fbRes.data.map((newGroup)=>{
        //Loop through groups that the user is an admin of

        Group.register(newGroup,(err,group)=>{
          if (err) {
            res.send(err);
          }
          Admin.assignNewAdmin({
            userID: req.user.facebook.id,
            groupID: group._id
          });
        });
        res.send("Thanks!!");
      });
    });
  };
}


function getGroups() {
  return (req,res)=>{
    Admin.find({adminID:req.user.facebook.id},(err,admins)=>{
      Group.find({_id:{ $in: admins.map((admin)=>{
            return admin.groupID;
      })}},(err,groups)=>{
        res.json(groups);

      });
    });
  };
}

function getAdmins() {
  return (req,res)=>{
    Admin.find({groupID:req.query.id},(err,admins)=>{
      res.json(admins);
    });
  };
}
module.exports.setFBGroup = setGroup;
module.exports.getFBGroups = getGroups;
module.exports.getGroupAdmins = getAdmins;
