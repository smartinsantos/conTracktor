var express = require('express');
var router = express.Router();

var auth = require('../auth.js');
//Uses DB config and Schema
var db = require('../lib/db.js');
var Workers = require('../lib/models/workers.js');

// Get all projects for a user
router.get('/', auth.requireAuth, function (req, res) {
  res.json({'success':true}); 
});

router.get('/:workerId', auth.requireAuth, function (req, res) {
  var workerId = req.params.workerId;
  res.json({'success':true,workerId:workerId}); 
    
});

router.post('/', auth.requireAuth, function (req, res) {
    res.json({'success':true}); 
});

router.put('/:workerId', auth.requireAuth, function (req, res) {
    res.json({'success':true}); 
});

router.delete('/:workerId', auth.requireAuth, function (req, res) {
    res.json({'success':true}); 
});

module.exports = router;
