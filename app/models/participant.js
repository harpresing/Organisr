'use strict';

//connecting to mongoose DB
const mongoose = require('mongoose');
const Training = require('./training');
const Schema = mongoose.Schema;
const _ = require('lodash');

//Trainings Schema
var ParticipantSchema = new Schema({
  memberId : {
    type : Number,
    required : "Member Id is missing"
  },
  trainingId : {
    type : Number,
    required : "Training Id is missing"
  },
  joinedOn : {
    type : Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Method to add a participant
 *
 * @param {Object} opts - participant data
 * @param {Function} callback
 */

TrainingSchema.statics.addParticipant = function(opts, callback) {
  var self = this;
  var data = _.cloneDeep(opts);

//create the training
  self.model('Participant').create(data, function(err, participant) {
    if (err) {
          return callback(err, null);
        }
        // return training if everything is ok
        callback(err, participant);
      });
  };

/**
* Method to find trainings for a participant
*
* @param {object} memberId - Id of the member to be searched
* @param {Function} callback
*/

ParticipantSchema.statics.findTrainings = function(memberId, callback) {
  var self = this;

//serach for the training
  self.model('Participant').find({memberId:memberId},(err,participants)=>{
    if (err) {
          return callback(err, null);
        }
        // return trainings if everything is ok
        var groupId = participants.groupId;
        Training.findTrainings(groupId,(err,trainings)=>{
          if(err){
            console.log(`Something went wrong ${err}`);
          }
          console.log(`Trainings Found for ${participantEmail} : ${trainings}`);
        });

        callback(err, trainings);

      });
    };

//method to get list of all the participants
TrainingSchema.methods.returnParticipants = function(callback){
  self.model('Participant').findBulk({},(err,participants)=>{
    if (err) {
      return callback(err, null);
    }
    // return trainings if everything is ok
      callback(err, participants);
  });
};

module.exports = mongoose.model('Participant', ParticipantSchema);
