'use strict';

const FB = require("fb");
const Group = require("./../models/group");
const Admin = require("./../models/admin");
const Member = require("./../models/member");
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

          FB.api(`${group._id}/members`,{},(fbRes2)=>{
            fbRes2.data.map((member)=>{
              const data = {
                memberID: member.id,
                groupID: group._id,
                administrator: member.administrator,
                name: member.name
              };
              Member.assignNewMember(data);
            });
            console.log(fbRes2);
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

function getMembers() {
  return (req,res)=>{
    Member.find({groupID:req.query.id},(err,members)=>{
      res.json(members);
    });
  };
}
module.exports.setFBGroup = setGroup;
module.exports.getFBGroups = getGroups;
module.exports.getGroupMembers = getMembers;
