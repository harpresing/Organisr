'use strict';

//author : Jeeva
//connecting to mongoose DB

const mongoose = require('mongoose');
const passwordHelper = require('../helpers/training');
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

//method to get training name
TrainingSchema.methods.returnTrainingName = function(){
  return this.name;
}

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


// Export training model
module.exports = mongoose.model('Training', TrainingSchema);
