'use strict';

const indexRoutes = require('./../app/routes/index');
const authRoutes = require('./../app/routes/authentication');

module.exports.init = (app)=>{
  app.use('/', indexRoutes);
  app.use('/',authRoutes);
};
