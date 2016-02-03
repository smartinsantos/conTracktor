var express = require('express');
var router = express.Router();

var auth = require('../auth.js');
//Uses DB config and Schema
var db = require('../lib/db.js');
var Properties = require('../lib/models/properties.js');

// Get all projects for a user
router.get('/', auth.requireAuth, function (req, res) {
  res.json({'success':true}); 
});

router.get('/:propId', auth.requireAuth, function (req, res) {
  var propId = req.params.propId;
  res.json({'success':true,propId:propId}); 
    
});

router.post('/', auth.requireAuth, function (req, res) {
    res.json({'success':true}); 
});

router.put('/:propId', auth.requireAuth, function (req, res) {
    res.json({'success':true}); 
});

router.delete('/:propId', auth.requireAuth, function (req, res) {
    res.json({'success':true}); 
});

module.exports = router;
