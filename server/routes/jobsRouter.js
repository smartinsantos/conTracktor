var express = require('express');
var router = express.Router();

var auth = require('../auth.js');
//Uses DB config and Schema
var db = require('../lib/db.js');
var Properties = require('../lib/models/properties.js');
var Jobs = require('../lib/models/jobs.js');
var Workers = require('../lib/models/workers.js');

// Get all projects for a user
router.get('/', auth.requireAuth, function (req, res) {
  res.json({'success':true}); 
});

router.get('/:jobId', auth.requireAuth, function (req, res) {
  var jobId = req.params.jobId;
  res.json({'success':true,jobId:jobId}); 
    
});

router.post('/', auth.requireAuth, function (req, res) {
    res.json({'success':true}); 
});

router.put('/:jobId', auth.requireAuth, function (req, res) {
    res.json({'success':true}); 
});

router.delete('/:jobId', auth.requireAuth, function (req, res) {
    res.json({'success':true}); 
});

module.exports = router;
