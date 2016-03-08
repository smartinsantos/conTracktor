var express = require('express');
var router = express.Router();

var auth = require('../auth.js');
//Uses DB config and Schema
var db = require('../lib/db.js');
var Properties = require('../lib/models/properties.js');
var Jobs = require('../lib/models/jobs.js');
var Workers = require('../lib/models/workers.js');
var helpers = require('../helpers.js');

var aws = require('aws-sdk');
var uuid = require('node-uuid');


// Get all projects for a user
router.get('/', auth.requireAuth,auth.requireAdmin, function (req, res) {
// var isAdmin = req.session.passport.user.admin;

  Jobs.find({}, function (err, doc) {
    if (err){ 
      console.log('error getting Jobs',err);
      return err;
    };
    return doc;
  })
  .populate('manager','first last email phone _id')
  .populate('propertie')
  .populate('services.worker')
  .then(function(jobs){
    res.status(200).json(jobs);
  })
  .catch(function(err){
    res.status(401).json({'error':true});
  });
});

router.get('/incompleted', auth.requireAuth,auth.requireAdmin, function (req, res) {

  Jobs.find({date_completed:{$exists:false}}, function (err, doc) {
    if (err){ 
      console.log('error getting Jobs',err);
      return err;
    };
    return doc;
  })
  .populate('manager','first last email phone _id')
  .populate('propertie')
  .populate('services.worker')
  .then(function(jobs){
    res.status(200).json(jobs);
  })
  .catch(function(err){
    res.status(401).json({'error':true});
  });
});

router.get('/completed/:dateQuery', auth.requireAuth,auth.requireAdmin, function (req, res) {
  //parse param dateQuery to Obj  
  var dateInfo = helpers.paramParser(req.params.dateQuery)
  //transform object into dates
  var startDate = new Date(dateInfo.startDate);
  var endDate = new Date(dateInfo.endDate);
  Jobs.find({date_completed:{"$gte": startDate, "$lt": endDate}}, function (err, doc) {
    if (err){ 
      console.log('error getting Jobs',err);
      return err;
    };
    return doc;
  })
  .populate('manager','first last email phone _id')
  .populate('propertie')
  .populate('services.worker')
  .then(function(jobs){
    res.status(200).json(jobs);
  })
  .catch(function(err){
    res.status(401).json({'error':true});
  });
});

router.get('/manager/:managerId', auth.requireAuth, function (req, res) {

  Jobs.find({'manager':req.params.managerId,date_completed:{$exists:false}}, function (err, doc) {
    if (err){ 
      console.log('error getting Jobs',err);
      return err;
    };
    return doc;
  })
  .populate('propertie')
  .populate('services.worker')
  .then(function(jobs){
    res.status(200).json(jobs);
  })
  .catch(function(err){
    res.status(401).json({'error':true});
  });
});

router.get('/:jobId', auth.requireAuth, function (req, res) {
  Jobs.findOne({'_id':req.params.jobId}, function(err,doc){
    if(err){
      console.log('error getting Job',err);
      return err;
    }
    return doc;
  })
  .then(function(job){
    res.status(200).json(job);
  })
  .catch(function(err){
    res.status(401).json({'error':true});
  })

});


router.post('/', auth.requireAuth, function (req, res) {
  
  var newJob = req.body;

  helpers.createJob(newJob)
  .then(function(job){
    res.status(201).json(job); 
  })
  .catch(function(err){
    console.log('Error Creating job...', err)
    res.status(401).json({'error':true})
  }) 

});

router.put('/:jobId', auth.requireAuth, function (req, res) {
  
  Jobs.findByIdAndUpdate( { '_id' : req.params.jobId }, { $set : req.body }, function(err, doc) {
    if (err) { 
      console.log('Jobs PUT ERR', err); 
      res.status(401).json({'error':true});
    };
    res.status(200).json(doc);
  }); 

});

router.delete('/:jobId', auth.requireAuth, function (req, res) {
  
  Jobs.remove( { '_id' : req.params.jobId }, function(err, doc) {
    if (err) { 
      console.log('Jobs delete ERR', err); 
      res.status(401).json({'error':true});
    };
    res.status(200).json(doc);
  }); 

});

// Handles generating a signed url to allow client to upload to AWS S3
router.post('/signedUrlAws', auth.requireAuth, function(req, res) {
  console.log('fileInfo on server', req.body)
  var file = req.body;
  // Check if file size was sent with request
  if (typeof file.size === 'undefined') {
    res.json({ error: 'Error getting file information' });
    return;
  }

  if (file.size > 75000000) {
    res.json({ error: 'Error processing file' });
    return;
  }

  // Generate a unique file name, extremely low chance of collisions
  var uniqueName = uuid.v4();

  // We configured AWS in app.js
  var s3 = new aws.S3();
  var bucket = process.env.AWS_BUCKET;

  // Pass this to the function that generates a signed URL
  // This prevents the client from uploading something different than what we have specified (Amazon will 403)
  var params = {
    Bucket: bucket, // S3 bucket to upload to
    Key: 'files/' + uniqueName + '-' + file.name, // Give the file a unique name
    ContentType: file.type, // We are always expecting a WAV file. NOTE: There are a few different mime types that can signify a WAV file
    ACL: 'public-read', // The file we upload should be readable by the public
    Expires: 180, // Signed URL will expire 3 minutes after being generated
  };

  // Generate a signed url that the client can upload to with their recording
  s3.getSignedUrl('putObject', params, (err, data) => {
    if (err) {
      console.log('Error creating a signed url');
      res.json({ error: 'Error creating a signed url' });
      return;
    }

    // Information to send back to client
    var returnData = {
      signedRequest: data, // Url the client should PUT recording
      url: 'https://' + bucket + '.s3.amazonaws.com/' + params.Key, // Url the client can access recording after upload
    };
    console.log('S3 DATA: ', data)
    res.json(returnData);
  });

});


module.exports = router;
