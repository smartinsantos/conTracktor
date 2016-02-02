var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Admin = require('./lib/models/admin.js');
var Worker = require('./lib/models/workers.js');


// Serialize a user
passport.serializeUser(function (user, done) {
  console.log('passport serializeUser:', user);
  done(null, { id: user.id, email: user.email, first: user.first, last: user.last });
});

// Deserialize a user
passport.deserializeUser(function (user, done) {
  console.log('passport deserializeUser:', user);
  Admin.findByEmail(user.email)
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
    console.log('on admin-create Local Strategy, req.body: ', req.body)
    var firstName = req.body.first; 
    var lastName = req.body.last; 
    var token = req.body.token;

    // Try to find the user first to check if they already have signed up
    Admin.findByEmail(username)
    .then(function (user) {
      // User already exists, we dont want to sign up
      if (user) {
        done(null, false, { message: 'User already exists' });
        return;
      }
      // User doesnt exist, lets create a new one
      // Hash the users supplied password
      return Admin.generateHash(password);
    })
    // After hashing password, try to create
    .then(function (passHash) {
      // Return a promise of the admin create
      return Admin.create({
        email: username,
        password: passHash,
        first: firstName,
        last: lastName,
        token: token
      });
    })
    // Admin successfully created
    .then(function (newAdmin) {
      return done(null, newAdmin, { message: 'Successfully Created' });
    })
    .catch(function (err) {
      return done(null, false, { message: 'Error signing up'});
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
