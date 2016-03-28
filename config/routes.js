'use strict';

const indexRoutes = require('./../app/routes/index');
const authRoutes = require('./../app/routes/authentication');
const facebookRoutes = require('./../app/routes/facebook');
const participantRoutes = require('./../app/routes/participant');

module.exports.init = (app)=>{
  app.use('/', indexRoutes);
  app.use('/',authRoutes);
  app.use('/fb',facebookRoutes);
  app.use('/participant',participantRoutes);
};
