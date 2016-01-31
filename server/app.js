var express = require('express');
var Path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var sass = require('node-sass-endpoint');

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
  
  //assign mainRouter to root
  app.use('/', router);

  //assing api router to /api 
  app.use('/api', router);

  // Start the server!
  var port = process.env.PORT || 4000;
  app.listen(port);
  console.log("Listening on port", port);
} else {
  // We're in test mode; make this file importable instead.
  module.exports = routes;
}
