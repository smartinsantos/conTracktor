var Path = require('path');
var express = require('express');
var sass = require('node-sass-endpoint');
var browserify  = require('browserify-middleware');
var ngAnnotate  = require('browserify-ngannotate');

//routers
var router = express.Router();

var adminsRouter = require('./adminsRouter');
var propertiesRouter = require('./propertiesRouter');
var jobsRouter = require('./jobsRouter');
var workersRouter = require('./workersRouter');



var assetFolder = Path.resolve(__dirname, '../../client/');

router.use(express.static(assetFolder));

var sharedAngular = [
  'angular',
  'angular-animate',
  'angular-cookies',
  'angular-mocks',
  'angular-messages',
  'angular-resource',
  'angular-sanitize',
  'angular-touch',
  'angular-ui-router',
  'angular-ui-router-anim-in-out',
  'jquery'
];

// Middleware that checks if logged in and sets cookie to true
// Used so that Angular can check for this cookies existence to see if logged in or not
router.use(function(req, res, next) {
  if (req.isAuthenticated()) {
    res.cookie('isLoggedIn', true);
  } else {
    res.cookie('isLoggedIn', false);
    req.logout();
  }
  next();
});


// Set up our different api endpoints
router.use('/admin', adminsRouter);
router.use('/properties', propertiesRouter);
router.use('/jobs', jobsRouter);
router.use('/workers', workersRouter);


// browserify.settings({ external: ['angular', 'jquery'] });
browserify.settings({
  ignoreMissing: true,
  external: [
    'jquery',
    'angular',
  ],
  noParse: [
    'jquery',
    'angular',
  ]
});

// Serve Foundation JS
router.get('/js/bootstrap.js', function(req, res){
  res.sendFile(Path.resolve('./node_modules/bootstrap-sass/assets/javascripts/bootstrap.js'));
  });
// Serve Angular and Angular modules
router.get('/js/angular.js', browserify(sharedAngular));
// Serve application js files
router.get('/js/app.js', browserify('./client/app.js', { transform: ngAnnotate }));


//Serving Sass Files
router.get(
    '/main.css',
    sass.serve('./client/sass/main.scss', {

      // (dev only) defaults to parent folder of scss file.
      // Any sass file changes in this directory will clear the output cache.
      watchDir: './client/sass/',

      // defaults to parent folder of scss file
      includePaths: ['./client/sass/','./node_modules/bootstrap-sass/assets/stylesheets/'],

      // defaults to false
      debug: false
    })
  );

// Basically, if we get to this point, serve our Angular app and let Angular deal with routing
router.get('/*', function (req, res) {
  res.sendFile(assetFolder + '/index.html');
});

module.exports = router; 

