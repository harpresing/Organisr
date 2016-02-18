'use strict';

const path = require('path');

module.exports.init = ()=> {
  var modelsPath = path.join(__dirname,'../app/models/');

  ['user'].forEach(function(model) {
    require(modelsPath + model);
  });
};
