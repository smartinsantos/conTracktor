var express = require('express');
var router = express.Router();

var auth = require('../auth.js');
//Uses DB config and Schema
var db = require('../lib/db.js');
var Workers = require('../lib/models/workers.js');
var helpers = require('../helpers.js');

// Get all projects for a user
router.get('/', auth.requireAuth, function (req, res) {
  
  Workers.find({}, function (err, doc) {
    if (err){ 
      console.log('error getting Job',err);
      return err;
    };
    return doc;
  })
  .then(function(workers){
    res.status(200).json(workers);
  })
  .catch(function(err){
    res.status(401).json({'error':true});
  });
});


router.get('/:workerId', auth.requireAuth, function (req, res) {
  Workers.findOne({'_id':req.params.workerId}, function(err,doc){
    if(err){
      console.log('error getting Job',err);
      return err;
    }
    return doc;
  })
  .then(function(worker){
    res.status(200).json(worker);
  })
  .catch(function(err){
    res.status(401).json({'error':true});
  })   
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
