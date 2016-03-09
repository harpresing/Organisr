'use strict';

const indexRoutes = require('./../app/routes/index');
const authRoutes = require('./../app/routes/authentication');
const facebookRoutes = require('./../app/routes/facebook');

module.exports.init = (app)=>{
  app.use('/', indexRoutes);
  app.use('/',authRoutes);
  app.use('/dashboard',facebookRoutes);
};
