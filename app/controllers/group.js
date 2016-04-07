'use strict';

const FB = require("fb");
const Group = require("./../models/group");
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
          });
        });
        res.send("Your clubs info has been updated!");
      });
    });
  };
}


function getGroups() {
  return (req,res)=>{
    Member.find({memberID:req.user.facebook.id},(err,members)=>{
      Group.find({_id:{ $in: members.map((member)=>{
            return member.groupID;
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

function postToFb() {
  return (req,res)=>{
    console.log(req.body.groupID);
    console.log(req.user.facebook.token);
    FB.setAccessToken(req.user.facebook.token);
    FB.api(`1727794110798446/feed`,'post',{
      message: req.body.message,
      link: `http://organisr.xyz/${req.body._id}`
    },()=>{
      res.send("Posted");
    });
  };
}
module.exports.setFBGroup = setGroup;
module.exports.getFBGroups = getGroups;
module.exports.getGroupMembers = getMembers;
module.exports.postToFBGroup = postToFb;
