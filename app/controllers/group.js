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
          console.log("Admin");
          console.log(group);
          console.log(req.user);
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

module.exports.setFBGroup = setGroup;
