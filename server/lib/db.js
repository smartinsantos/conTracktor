var db = require('mongoose');
db.Promise = require('bluebird');

// Configure mongoose with the correct environment configuration
var config = {
  dbUrl: process.env.MONGOLAB_URI || 'mongodb://localhost/conTracktor'
};

//connect to DB
db.connect(config.dbUrl);

//DB on error throw
db.connection.on('error', function(err){
 console.log('Connection to DB failed: ', err);
})

db.connection.once('open', function (callback) {
  console.log('Connected to DB Success!');
});

module.exports = db;
