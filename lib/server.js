// server.js

// set up ======================================================================
// get all the tools we need
require('app-module-path').addPath('D:/xampp/htdocs/sp_nos_dev');
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var passport = require('passport');
var flash = require('connect-flash');
var busboy = require('connect-busboy');

module.exports = function () {
// configuration ===============================================================
// connect to our database
  require('config/passport')(passport); // pass passport for configuration

  // set up our express application
  app.use(busboy());
  app.use(morgan('dev')); // log every request to the console
  app.use(cookieParser()); // read cookies (needed for auth)
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.set('view engine', 'ejs'); // set up ejs for templating

  app.use(express.static('public'));
  // required for passport
  app.use(session({
    secret: 'vidyapathaisalwaysrunning',
    resave: true,
    saveUninitialized: true
  })); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash()); // use connect-flash for flash messages stored in session

  // routes ======================================================================
  require('config/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

  return app;
};
