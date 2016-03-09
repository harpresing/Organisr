'use strict';

//connecting to mongoose DB
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');

//Trainings Schema
var ParticipantSchema = new Schema({
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
  self.model('Training').find({participants:participantEmail},(err,trainings)=>{
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

/*--Start remove content--*/
mongoose.connect("mongodb://localhost/organisr-dev");
var Training = mongoose.model('Training', TrainingSchema);
//Sample data
const trainingData = {
  name : "Running",
  date : new Date(),
  time : new Date(),
  venue : "Trinity",
  coach : "Stephen",
  instructions : "Loooooooooooooooooooooooooooooooooooooooongggggggggggggggggggggg Instructions",
  participants : ["harpreet@test.com","jane@test.com","huoda@test.com"]
};

const participantEmail = "harpreet@test.com";

Training.addTraining(trainingData,(err,training)=>{
  if(err){
    console.log(`Something went wrong ${err}`);
  }
  console.log(`Saved: ${training}`);
});

Training.findTrainings(participantEmail,(err,trainings)=>{
  if(err){
    console.log(`Something went wrong ${err}`);
  }
  console.log(`Trainings Found for ${participantEmail} : ${trainings}`);
});

module.exports = Training;
/*--End remove content--*/

// Export training model

/*Uncomment the last line*/
// module.exports = mongoose.model('Training', TrainingSchema);
