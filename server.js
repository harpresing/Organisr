"use strict";

// Get process environment or set default environment to development
const ENV = process.env.NODE_ENV || 'development';

const express = require("express");
const path = require('path');
/*eslint-disable */
const favicon = require('serve-favicon');
/*eslint-enable */
const logger = require("morgan");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const session = require('express-session');
const passport = require('passport');

// Set port for local development
const app = express();

//Import Configurations
const config = require('./config');

app.set('config',config);
app.set('env',ENV);

app.set('port', (process.env.PORT || 5001));

// View engine setup
app.set('views', path.join(__dirname,'app/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

//Session options
var sessionOpts = {
    secret: "keyboard-cat",
    key: 'skey.sid',
    resave: false,
    saveUninitialized: false
};
app.use(session(sessionOpts));
/**
 * Use passport session
 */
app.use(passport.initialize());
app.use(passport.session());

//Import Configurations
require('./config/mongoose').init(app);
require('./config/models').init();
require('./config/routes').init(app);
require('./config/passport').init(app);

app.use(function(req, res, next) {
    // a simple object that holds resources for each request
    req.resources = req.resources || {};
    res.locals.app = config.app;
    res.locals.currentUser = req.user;
    // mock i18n funciton
    res.locals._t = function (value) { return value; };
    res.locals._s = function (obj) { return JSON.stringify(obj); };

    next();
});

app.listen(app.get('port')||5001,()=>{
  console.log(`Organisr is now running on port ${app.get('port')||5001}`);
});

module.exports = app;
