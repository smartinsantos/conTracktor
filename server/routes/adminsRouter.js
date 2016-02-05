//Uses Express defines router
var express = require('express');
var router = express.Router();

var passport = require('passport');


//Uses DB config and Schema
var db = require('../lib/db.js');
var Admins = require('../lib/models/admin.js');

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
      // IF NEEDED databse id = user._id
      res.cookie('isLoggedIn', true);
      res.cookie('isAdmin', true);
      res.status(200).json({ loggedIn: true });
    });
  })(req, res, next);
});

// Signs a user out, have it as a post so that people cant be tricked into going to the link
router.post('/signout',  function (req, res) {
  req.logout();
  res.clearCookie('isLoggedIn');
  res.status(200).json({'success':true});
});

// TODO : this currently does nothing
// Get user info by id
router.get('/:userId', function (req, res) {
  var userId = req.params.userId;
  // var userId = req.session.passport.user;
  res.json({'success':true,userId:userId});
});

// Update user info by id
router.put('/:userId', function (req, res) {
  var userId = req.params.userId;
  res.json({'success':true,userId:userId});
});

router.delete('/:userId',function(req,res){
  var userId = req.params.userId;
  res.json({'success':true,userId:userId});
});

module.exports = router;
