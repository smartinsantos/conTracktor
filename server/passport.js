var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var helpers = require('./helpers.js');

var Admin = require('./lib/models/admin.js');
var Worker = require('./lib/models/workers.js');


// Serialize a user
passport.serializeUser(function (user, done) {
  console.log('passport serializeUser:', user);
  done(null, {email: user.email, first: user.first, last: user.last});
});

// Deserialize a user
passport.deserializeUser(function (user, done) {
  console.log('passport deserializeUser:', user);
  helpers.findAdminByEmail(user.email)
  .then(function (user) {
    done(null, user);
  })
  .catch(function (err) {
    done(err, null);
  });
});

passport.use('admin-create', new LocalStrategy(
  // We want to pass req.body so that we can get the additional fields at sign up, such as first name, last name
  { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
  function (req, username, password, done) {
    var firstName = req.body.first; 
    var lastName = req.body.last; 
    var token = req.body.token; //TODO: check if Token matches Env Variable if not admin can't be created
    // Try to find the user first to check if they already have signed up
    helpers.findAdminByEmail(username)
    .then(function (user) {
      // User already exists, we dont want to sign up
      if (user) {
        done(null, false, { message: 'User already exists' });
        return;
      }
      
      return helpers.generateHash(password); 
    })
    // After hashing password, try to create
    .then(function (passHash) {
      console.log('i am getting into then after duplicated user')
      // Return a promise of the admin create
      return helpers.adminCreate({
        email: username,
        password: passHash,
        first: firstName,
        last: lastName,
      })
    })
    // Admin successfully created
    .then(function (newAdmin) {
      return done(null, newAdmin, { message: 'Successfully Created' });
    })
    .catch(function (err) {
      console.log('catched error', err);
      // return done(err, false, { message: 'Error signing up'});
    });
  }
));

// passport.use('local-login', new LocalStrategy(
//   // TODO : change these to the actual names in the json object being sent
//   { usernameField: 'email', passwordField: 'password'},
//   function (email, enteredPassword, done) {
//     var user = null;
//     User.findByEmail(email)
//     .then(function (signedInUser) {
//       if (!signedInUser) {
//         throw Error('User not found');
//       } else {
//         user = signedInUser;
//         return User.validPassword(enteredPassword, user.password);
//       }
//     })
//     .then(function (isValid) {
//       if (!isValid) {
//         throw Error('Invalid password');
//       } else {
//         done(null, user, { message: 'Successfully signed in' });
//       }
//     })
//     .catch(function (err) {
//       done(err, false, { message: 'Incorrect user details' });
//     });
//   }
// ));
