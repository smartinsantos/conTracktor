var express = require('express');
var router = express.Router();

var auth = require('../auth.js');
//Uses DB config and Schema
var db = require('../lib/db.js');
var Reports = require('../lib/models/reports.js');

var helpers = require('../helpers.js');
var uuid = require('node-uuid');


// Get all reports for a user
router.get('/admin/:adminId', auth.requireAuth, auth.requireAdmin, function (req, res) {
  Reports.find({'owner':req.params.adminId}, function (err, doc) {
    if (err){ 
      console.log('error getting Reports',err);
      return err;
    };
    return doc;
  })
  .then(function(reports){
    res.status(200).json(reports);
  })
  .catch(function(err){
    res.status(401).json({'error':true});
  });
});

router.get('/:reportId', auth.requireAuth,auth.requireAdmin, function (req, res) {
  Reports.findOne({'_id':req.params.reportId}, function(err,doc){
    if(err){
      console.log('error getting Report',err);
      return err;
    }
    return doc;
  })
  .then(function(report){
    res.status(200).json(report);
  })
  .catch(function(err){
    res.status(401).json({'error':true});
  })

});

router.get('/name/:reportName', auth.requireAuth,auth.requireAdmin, function (req, res) {
  Reports.findOne({'name':req.params.reportName}, function(err,doc){
    if(err){
      console.log('error saving Report',err);
      return err;
    }
    return doc;
  })
  .then(function(report){
    res.status(200).json(report);
  })
  .catch(function(err){
    res.status(401).json({'error':true});
  })

});

router.post('/', auth.requireAuth,auth.requireAdmin, function (req, res) {
  
  var newReport = req.body;

  helpers.createReport(newReport)
  .then(function(report){
    res.status(201).json(report); 
  })
  .catch(function(err){
    console.log('Error Creating Report...', err)
    res.status(401).json({'error':true})
  }) 

});

router.put('/:reportId', auth.requireAuth,auth.requireAdmin, function (req, res) {
  
  Reports.findByIdAndUpdate( { '_id' : req.params.reportId }, { $set : req.body }, function(err, doc) {
    if (err) { 
      console.log('Reports PUT ERR', err); 
      res.status(401).json({'error':true});
    };
    res.status(200).json(doc);
  }); 

});

router.delete('/:reportId', auth.requireAuth,auth.requireAdmin, function (req, res) {
  
  Reports.remove( { '_id' : req.params.reportId }, function(err, doc) {
    if (err) { 
      console.log('Reports delete ERR', err); 
      res.status(401).json({'error':true});
    };
    res.status(200).json(doc);
  }); 

});

module.exports = router;
