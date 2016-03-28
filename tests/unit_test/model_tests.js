"use strict";

process.env.NODE_ENV = "test";

const chai = require("chai");
const expect = chai.expect;
const Group = require("./../../app/models/group");
const Member = require("./../../app/models/member");
const Training = require("./../../app/models/training");
const Participant = require("./../../app/models/participant");
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

const testTrainingData = [{
    "groupID" : "groupId1",
  	"title" : "Test",
  	"date" : "Thursday, March 31st, 2016",
  	"time" : "15:38",
  	"venue" : "test",
  	"city" : "test",
  	"instructors" : [
  		"1027723220583857"
  	]
  },
  {
    "groupID" : "groupId3",
  	"title" : "Test",
  	"date" : "Thursday, March 31st, 2016",
  	"time" : "15:38",
  	"venue" : "test",
  	"city" : "test",
  	"instructors" : [
  		"1027723220583857"
  	]
  },
  {
    "groupID" : "groupId2",
  	"title" : "Test",
  	"date" : "Thursday, March 31st, 2016",
  	"time" : "15:38",
  	"venue" : "test",
  	"city" : "test",
  	"instructors" : [
  		"1027723220583857"
  	]
  }
];

const participantData = [
  {
    sessionId: 'session1',
    userId:'user1'
  }
];

describe('Group model', function () {
  beforeEach(populateTestDB);

  afterEach(clearTestDB);

  it('get group 1', function (done) {
    Group.findOne({_id:"groupId1"},(err,group)=>{
      expect(group.name).to.be.equal("group1");
      done();
    });
  });

  it('get all the groups', function (done) {
    Group.find({},(err,groups)=>{
      if(err) return done(err);
      expect(groups.length).to.be.equal(4);
      done();
    });
  });

  it('get the group and it\'s associated trainning sessions', function (done) {
    Group.getAssociatedTrainningSessions(["groupId1","groupId2"],(err,groups)=>{
      if(err) return done(err);
      expect(groups.length).to.be.equal(2);
      const group = groups[0];
      expect(group.sessions).not.to.be.equal(undefined);
      expect(group.sessions.length).to.be.equal(1);
      const session = group.sessions[0];
      expect(session.title).to.equal("Test");
      done();
    });
  });
});

describe('Member model', function () {
  beforeEach(populateTestDB);

  afterEach(clearTestDB);

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
      expect(groups.length).to.be.equal(2);
      expect(groups[0].name).to.be.equal("group1");
      expect(groups[1].name).to.be.equal("group2");
      done();
    });
  });
});

describe('Training model', function () {
  beforeEach(populateTestDB);

  afterEach(clearTestDB);

  it('find a training session', function (done) {
    Training.find({},(err,trainings)=>{
      expect(trainings).to.be.array;
      expect(trainings[0].groupID).to.be.equal("groupId1");
      done();
    });
  });

  it('get all affiliated Training sessions', function (done) {
    Training.getAffiliatedSession("mem1",(err,sessions)=>{
      expect(sessions.length).to.be.equal(2);
      const session = sessions[0];
      expect(session.group).not.be.equal(undefined);
      done();
    });
  });
});

describe('Participant model', function () {
  beforeEach(populateTestDB);

  afterEach(clearTestDB);

  it('join session', function (done) {
    Participant.joinSession(participantData[0],(err,participant)=>{
      expect(err).to.be.null;
      var userId = participant.userId;
      expect(userId).to.be.equal('user1');
      done();
    });
  });

  it("can't join a session twice", function (done) {
    Participant.joinSession(participantData[0],()=>{
      Participant.joinSession(participantData[0],(err)=>{
        expect(err).not.to.be.null;
        expect(err.message).to.be.equal("Already Joined");
        done();
      });
    });
  });

  it('can leave a session', function (done) {
    Participant.joinSession(participantData[0],()=>{
      Participant.remove(participantData[0],()=>{
        Participant.find({},(err,participants)=>{
          expect(participants.length).to.be.equal(0);
          done();
        });
      });
    });
  });
});

function populateTestDB(done) {
  testGroupData.map((group)=>{
    Group.create(group,()=>{
    });
  });
  testMemberData.map((member)=>{
    Member.create(member);
  });
  testTrainingData.map((training)=>{
    Training.create(training);
  });
  done();
}

function clearTestDB(done) {
  testGroupData.map((group)=>{
    Group.remove(group,()=>{
    });
  });
  testMemberData.map((member)=>{
    Member.remove(member,()=>{});
  });
  testTrainingData.map((training)=>{
    Training.remove(training,()=>{});
  });

  Participant.remove({},()=>{});
  done();
}
