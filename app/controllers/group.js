'use strict';

const FB = require("fb");
const Group = require("./../models/group");
FB.options({version: 'v2.5'});

function getGroup(){
  return (req,res)=>{
    FB.setAccessToken(req.user.facebook.token);
    FB.api("me/groups",{},(fbRes)=>{
      console.log(fbRes);
      fbRes.data.map((newGroup)=>{
        Group.add(newGroup,(err)=>{
          if (err) {
            res.send(err);
          }
        });
        res.send("Success");
      });
    });
  };
}

module.exports.getFbGroup = getGroup;
