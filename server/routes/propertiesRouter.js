var express = require('express');
var router = express.Router();

var auth = require('../auth.js');
//Uses DB config and Schema
var db = require('../lib/db.js');
var Properties = require('../lib/models/properties.js');
var helpers = require('../helpers.js');

// Get all projects for a user
router.get('/', auth.requireAuth, function (req, res) {
  
  Properties.find({}, function (err, doc) {
    if (err){ 
      console.log('error getting Properties...',err);
      return err;
    };
    return doc;
  })
  .then(function(properties){
    res.status(200).json(properties);
  })
  .catch(function(err){
    res.status(401).json({'error':true});
  });

});

router.get('/:propId', auth.requireAuth, function (req, res) {
  
  Properties.findOne({'_id':req.params.propId}, function(err,doc){
    if(err){
      console.log('error getting Propertie...',err);
      return err;
    }
    return doc;
  })
  .then(function(propertie){
    res.status(200).json(propertie);
  })
  .catch(function(err){
    res.status(401).json({'error':true});
  })   
    
});

router.post('/', auth.requireAuth, function (req, res) {
  helpers.createPropertie(req.body)
  .then(function(propertie){
    res.status(201).json(propertie); 
  })
  .catch(function(err){
    console.log('Error Creating Propertie...', err)
    res.status(401).json({'error':true})
  }) 
});

router.put('/:propId', auth.requireAuth, function (req, res) {

  Properties.findByIdAndUpdate( { '_id' : req.params.propId }, { $set : req.body }, function(err, doc) {
    if (err) { 
      console.log('Propertie PUT ERR', err); 
      res.status(401).json({'error':true});
    };
    res.status(200).json(doc);
  });
});

router.delete('/:propId', auth.requireAuth, function (req, res) {
  
  Properties.remove( { '_id' : req.params.propId }, function(err, doc) {
    if (err) { 
      console.log('Properties delete ERR', err); 
      res.status(401).json({'error':true});
    };
    res.status(200).json(doc);
  }); 
});

module.exports = router;
