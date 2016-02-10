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
      console.log('error getting Workers',err);
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
      console.log('error getting Worker',err);
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

  helpers.createWorker(req.body)
  .then(function(worker){
    res.status(201).json(worker); 
  })
  .catch(function(err){
    console.log('Error Creating Worker...', err)
    res.status(401).json({'error':true})
  })

});

router.put('/:workerId', auth.requireAuth, function (req, res) {

  Workers.findByIdAndUpdate( { '_id' : req.params.workerId }, { $set : req.body }, function(err, doc) {
    if (err) { 
      console.log('Workers PUT ERR', err); 
      res.status(401).json({'error':true});
    };
    res.status(200).json(doc);
  });

});

router.delete('/:workerId', auth.requireAuth, function (req, res) {

  Workers.remove( { '_id' : req.params.workerId }, function(err, doc) {
    if (err) { 
      console.log('Workers delete ERR', err); 
      res.status(401).json({'error':true});
    };
    res.status(200).json(doc);
  }); 

});

module.exports = router;
