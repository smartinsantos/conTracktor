//Uses Express defines router
var express = require('express');
var router = express.Router();
var auth = require('../auth.js');

var passport = require('passport');

//Uses DB config and Schema
var db = require('../lib/db.js');
var Admins = require('../lib/models/admin.js');


router.get('/', auth.requireAuth, auth.requireAdmin, function (req, res) {

  Admins.find({},'first last email admin phone', function (err, doc) {
    if (err){ 
      console.log('error getting Admins',err);
      return err;
    };
    return doc;
  })
  .then(function(admins){
    res.status(200).json(admins);
  })
  .catch(function(err){
    res.status(401).json({'error':true});
  });

});

// Creates new user
router.post('/create', function (req, res, next) {

  passport.authenticate('admin-create', function (err, user, info) {
   if (err) {
      res.status(500).json({ created: false, error: err, info: info });
      return;
    }
    if (!user) {
      res.status(401).json({ created: false, info: info });
      return;
    }
    res.status(201).json({ created: true, info:info });
  })(req, res, next);
});

// Authenticates a user
router.post('/signin', function (req, res, next) {

  passport.authenticate('admin-login', function (err, user, info) {
    if (err) {
      console.log('signin err', err);
      res.status(401).json({ loggedIn: false, error: true, info: info });
      return;
    }
    if (!user) {
      console.log('signin !user');
      res.status(401).json({ loggedIn: false, error: true, info: info });
      return;
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(401).json({ loggedIn: false, error: true, info: info });
      }
      if(!user.admin){
        res.cookie('isManager',true);
      }else{
        res.cookie('isManager',false);
      }
      res.cookie('isLoggedIn', true);
      res.status(200).json({ loggedIn: true });
    });
  })(req, res, next);
});

// Signs a user out, have it as a post so that people cant be tricked into going to the link
router.post('/signout',  function (req, res) {
  req.logout();
  res.clearCookie('isLoggedIn');
  res.clearCookie('isManager');
  res.status(200).json({'success':true});
});

// TODO : this currently does nothing
// Get user info by id
router.get('/:userId', function (req, res) {
  
  var userId = req.params.userId;
  Admins.findOne({'_id':req.params.userId}, function(err,doc){
      if(err){
        console.log('error getting Admin',err);
        return err;
      }
      return doc;
    })
    .then(function(admin){
      res.status(200).json(admin);
    })
    .catch(function(err){
      res.status(401).json({'error':true});
    })
});

// Update user info by id
router.put('/:userId', function (req, res) {
  var userId = req.params.userId;
  Admins.findByIdAndUpdate( { '_id' : req.params.userId }, { $set : req.body }, function(err, doc) {
    if (err) { 
      console.log('Admins PUT ERR', err); 
      res.status(401).json({'error':true});
    };
    res.status(200).json(doc);
  });
});

router.delete('/:userId',function(req,res){
  var userId = req.params.userId;
  Admins.remove( { '_id' : req.params.userId }, function(err, doc) {
    if (err) { 
      console.log('Admin delete ERR', err); 
      res.status(401).json({'error':true});
    };
    res.status(200).json(doc);
  });
});

module.exports = router;
