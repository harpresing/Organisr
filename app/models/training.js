'use strict';

//connecting to mongoose DB
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');

//Trainings Schema
var TrainingSchema = new Schema({
  title : {
    type : String,
    required : "Please enter a training name"
  },
  date : {
    type : String,
    required : "Please enter a date"
  },
  time : {
    type : String,
    required : "Please enter a time"
  },
  venue : {
    type : String,
    required : "Please enter a venue"
  },
  city : {
    type : String,
    required : "Please enter a city"
  },
  instructors : {
    type : [String],
    required: "You need coaches and instructors"
  },
  instructions : {
    type : String
  },
  groupSize : {
    type  : Number
  },
  groupNumber : {
    type  : Number
  },
  groupId : {
    type  : String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Method to create a training event
 *
 * @param {Object} opts - training data
 * @param {Function} callback
 */

TrainingSchema.statics.addTraining = function(opts, callback) {
  var self = this;
  var data = _.cloneDeep(opts);

//create the training
  self.model('Training').create(data, function(err, training) {
    if (err) {
          return callback(err, null);
        }
        // return training if everything is ok
        callback(err, training);
      });
  };

/**
* Method to find trainings for a participant
*
* @param {object} participantEmail - Email of the participant to be searched
* @param {Function} callback
*/

TrainingSchema.statics.findTrainings = function(groupId, callback) {
  var self = this;

//serach for the training
  self.model('Training').find({groupId:groupId},(err,trainings)=>{
    if (err) {
          return callback(err, null);
        }
        // return trainings if everything is ok
        callback(err, trainings);
      });
    };

//method to get list of all the trainings
TrainingSchema.methods.returnTrainingName = function(callback){
  self.model('Training').findBulk({},(err,trainings)=>{
    if (err) {
      return callback(err, null);
    }
    // return trainings if everything is ok
      callback(err, trainings);
  });
};

// Export training model
module.exports = mongoose.model('Training', TrainingSchema);
