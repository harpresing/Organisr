"use strict";

process.env.NODE_ENV = "test";

const chai = require("chai");
const expect = chai.expect;
const Group = require("./../../app/models/group");
const Member = require("./../../app/models/member");
const mongoose = require("mongoose");
const config = require("./../../config/index");
mongoose.connect(config.mongodb.uri);

const testGroupData = [
  {
    _id: 'groupId1',
    name: "group1",
    icon: "group1",
    link: "group1"
  },{
    _id: 'groupId2',
    name: "group2",
    icon: "group2",
    link: "group2"
  },{
    _id: 'groupId3',
    name: "group3",
    icon: "group3",
    link: "group3"
  }
];

const testMemberData = [
  {
    memberID:"mem1",
    groupID:"groupId1",
    administrator:"mem1",
    name:"mem1"
  },
  {
    memberID:"mem1",
    groupID:"groupId2",
    administrator:"mem1",
    name:"mem1"
  },
  {
    memberID:"mem2",
    groupID:"groupId3",
    administrator:"mem2",
    name:"mem2"
  },
  {
    memberID:"mem2",
    groupID:"groupId1",
    administrator:"mem2",
    name:"mem2"
  }
];

describe('Group model', function () {
  beforeEach((done)=>{
    testGroupData.map((group)=>{
      Group.create(group,()=>{
      });
    });
    done();
  });

  afterEach((done)=>{
    testGroupData.map((group)=>{
      Group.remove(group,()=>{
      });
    });
    done();
  });

  it('get group 1', function (done) {
    Group.findOne({_id:"groupId1"},(err,group)=>{
      expect(group.name).to.be.equal("group1");
      done();
    });
  });

  it('get all the groups', function (done) {
    Group.find({},(err,groups)=>{
      if(err) return done(err);
      expect(groups.length).to.be.equal(3);
      done();
    });
  });
});

describe('Member model', function () {
  beforeEach(function (done) {
    testGroupData.map((group)=>{
      Group.create(group,()=>{
      });
    });
    testMemberData.map((member)=>{
      Member.create(member);
    });
    done();
  });

  afterEach(function (done) {
    testGroupData.map((group)=>{
      Group.remove(group,()=>{
      });
    });
    testMemberData.map((member)=>{
      Member.remove(member,()=>{});
    });
    done();
  });

  it('find a member', function (done) {
    Member.find({memberID:"mem1"},(err,member)=>{
      expect(member).to.be.array;
      expect(member[0].name).to.be.equal("mem1");
      done();
    });
  });

  it('get all the groups to belong to a member', function (done) {
    Member.findGroups("mem1",(err,groups)=>{
      if(err) return done(err);
      console.log(groups);
      expect(groups.length).to.be.equal(2);
      expect(groups[0].name).to.be.equal("group1");
      expect(groups[1].name).to.be.equal("group2");
      done();
    });
  });
});