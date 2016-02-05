var Admin = require('./lib/models/admin.js');
var Workers = require('./lib/models/workers.js');
var Jobs = require('./lib/models/jobs.js');
var Properties = require('./lib/models/properties.js');

var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

var helpers = {};

// Admin Helpers
helpers.findAdminByEmail = function(email){
  return Admin.findOne({ 'email': email }, function (err, doc) {
    if (err){ 
      console.log('error finding email',err);
      return err;
    };
    return doc;
  });
};

helpers.adminCreate = function (attrs) {
  console.log('Creating Admin...')
  // Create this object incase attrs contains any extra data we dont want/need
  var adminAttrs = {
    email: attrs.email,
    password: attrs.password,
    first: attrs.first,
    last: attrs.last,
    admin: true
  };
  
  var admin = new Admin(adminAttrs);
  return admin.save(function(err){
    if (err){
      console.log('failed to create new Admin',err);
      return err;
    }
    return admin;
  });
};

//Workers Helpers

//General Helpers
helpers.generateHash = function(password) {
  console.log('Generating Hash...');
  return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};

helpers.validPassword = function(enteredPassword, passwordHash) {
  console.log('Validating Hashed password...'); 
  return bcrypt.compareSync(enteredPassword, passwordHash);
};

//Properties Helpers

helpers.getAllProperties = function(){
  return Propertie.find({ }, function (err, doc) {
    if (err){ 
      console.log('error getting properties',err);
      return err;
    };
    return doc;
  });
};

helpers.findPropertieByName = function(name){
  return Propertie.findOne({ 'name': name }, function (err, doc) {
    if (err){ 
      console.log('error finding propertie name',err);
      return err;
    };
    return doc;
  });
};


helpers.createPropertie = function (attrs) {
  console.log('Creating Propertie...')
  // Create this object incase attrs contains any extra data we dont want/need
  var propAttrs = {
    name: attrs.name,
    address: attrs.address,
    contacts: attrs.contacts,
    description: attrs.description,
  };
  
  var propertie = new Propertie(propAttrs);
  return propertie.save(function(err){
    if (err){
      console.log('failed to create new Propertie');
      return err;
    }
    return propertie;
  });
};

//Workers Helpers

helpers.findWorkerByEmail = function(email){
  return Worker.findOne({ 'email': email }, function (err, doc) {
    if (err){ 
      console.log('error finding worker email',err);
      return err;
    };
    return doc;
  });
};

helpers.createWorker = function (attrs) {
  console.log('Creating Propertie...')
  // Create this object incase attrs contains any extra data we dont want/need
  var workerAttrs = {
    first: attrs.first,
    last: attrs.last,
    email: attrs.email,
    password: attrs.password,
    phone: attrs.phone,
    address: attrs.address,
  };
  
  var worker = new Propertie(propAttrs);
  return worker.save(function(err){
    if (err){
      console.log('failed to create new worker');
      return err;
    }
    return worker;
  });
};

// Jobs Helpers

helpers.getAllJobs = function(){
  return Jobs.find({ }, function (err, doc) {
    if (err){ 
      console.log('error getting Jobs',err);
      return err;
    };
    return doc;
  });
};

helpers.findJobByPropName = function(name){
  helpers.findPropertieByName(name)
  .then(function(prop){
    //looks up for the job with the property object...
    console.log('propertie to look up', prop);
  })
  .catch (function(err){
    return err
  });
};


helpers.findJobByWorkerEmail = function(email){
  helpers.findWorkerByEmail(email)
  .then(function(worker){
    //looks up for the job with the property object...
    console.log('worker to look up', worker);
  })
  .catch (function(err){
    return err
  });
};



helpers.createJob = function (attrs) {
  //creates a new job
  console.log('creating job')
};


module.exports = helpers;
