var express = require('express');
var router = express.Router();

var auth = require('../auth.js');
//Uses DB config and Schema
var db = require('../lib/db.js');
var Workers = require('../lib/models/workers.js');
var helpers = require('../helpers.js');

var twilio = require('twilio')(process.env.ENV_TWILIO_SID_TEST, process.env.ENV_TWILIO_TOKEN_TEST);

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
    console.log('this is worker', worker);
      res.status(201).send(worker); 
  })
  .catch(function(err){
    console.log('Error Creating Worker...', err)
    res.status(400);
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

router.post('/message/test', function (req, res) {

  twilio.sendMessage({
    to:'+12107184570', // Any number Twilio can deliver to
    from: '+15005550006', // A number you bought from Twilio and can use for outbound communication
    body: 'Testing Twilio!!!!!!!!!.' // body of the SMS message
    }, function(err, responseData) { //this function is executed when a response is received from Twilio
      if (!err) { // "err" is an error received during the request, if any
          console.log('sending message');
          // "responseData" is a JavaScript object containing data received from Twilio.
          // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
          // http://www.twilio.com/docs/api/rest/sending-sms#example-1
          console.log(responseData.from); // outputs "+14506667788"
          console.log(responseData.body); // outputs "word to your mother."
          res.status(200).json({success:'Message Sent'})
      }else{
        console.log(err);
        res.status(400).json({error:err})
      }
    });
});


module.exports = router;
