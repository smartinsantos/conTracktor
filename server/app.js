require('dotenv').load();

var express = require('express');
var session = require('express-session');
var uuid = require('node-uuid');

var Path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var sass = require('node-sass-endpoint');

var passport = require('passport');
require('./passport.js');

var db = require('./lib/db.js');

var router = require('./routes/mainRouter.js')

// Example endpoint (also tested in test/server/index_test.js)
router.get('/api/tags-example', function(req, res) {
  res.send(['node', 'express', 'angular'])
});

if(process.env.NODE_ENV !== 'test') {
  // We're in development or production mode;
  // create and run a real server.
  var app = express();

   // Use morgan to log requests to our express server to the console
  app.use(morgan('dev'));
  // Parse incoming request bodies as JSON
  app.use(bodyParser.json());

  // Parse incoming cookies
  app.use(cookieParser());

    app.use(session({
    name: 'conTracktor',
    secret: 'Katz!',
    resave: false, // Whether or not to save the session back to the store if no modification happened
    rolling: true, // Resets expiry date after each request
    saveUninitialized: false, // Save new sessions that havent been modified
    genid: function() { // Each session id will be based on uuid v4
      console.log(uuid.v4());
      return uuid.v4();
    }
  }));

  // Set up passport so that we can use it to test authentication status
  // As well as use it for authentication
  app.use(passport.initialize());
  app.use(passport.session());
  
  //assign mainRouter to root
  app.use('/', router);

  // Start the server!
  var port = process.env.PORT || 4000;
  app.listen(port);
  console.log("Listening on port", port);
} else {
  // We're in test mode; make this file importable instead.
  module.exports = routes;
}
