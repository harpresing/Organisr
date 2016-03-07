'use strict';

//author : Jeeva

//connecting to mongoose DB
const mongoose = require('mongoose');
const passwordHelper = require('../helpers/training'); // yet to create
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const _ = require('lodash');

//Trainings Schema
var TrainingSchema = new Schema({
  name : {
    type : String,
    required : "Please enter a training name"
  },
  date : {
    type : Date,
    required : "Please enter a date"
  },
  time : {
    type : Date,
    required : "Please enter a time"
  },
  venue : {
    type : String,
    required : "Please enter a venue"
  },
  coach : {
    type : String
  },
  instructions : {
    type : String
  },
  participants : {
    type : [String]
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

TrainingSchema.statics.findTrainings = function(participantEmail, callback) {
  var self = this;

//serach for the training
  self.model('Training').findBulk({participants:participantEmail},(err,trainings)=>{
    if (err) {
          return callback(err, null);
        }
        // return trainings if everything is ok
        callback(err, training);
      });
    };

//method to get list of all the trainings
  TrainingSchema.methods.returnTrainingName = function(){
    self.model('Training').findBulk({},(err,trainings)=>{
      if (err) {
            return callback(err, null);
          }
          // return trainings if everything is ok
          callback(err, training);
        });
      };
  }

// Export training model
module.exports = mongoose.model('Training', TrainingSchema);
