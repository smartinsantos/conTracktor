var db = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = db.Schema;

var AdminSchema = new Schema({
      first: String,
      last: String,
      email: {type: String, required: true, unique: true},
      password: String  
});


AdminSchema.methods.all = function () {

};

// finds a Admins by email
AdminSchema.methods.findByEmail = function(email) {
  Admin.findOne({ 'email': email }, function (err, doc) {
  if (err) return handleError(err);
  return doc;
})

};

// finds a Admins by id
AdminSchema.methods.findById = function (id) {
};


// creates a new AdminSchema.methods with name, and hashed password
AdminSchema.methods.create = function (attrs) {
  // Create this object incase attrs contains any extra data we dont want/need
  var adminAttrs = {
    email: attrs.email,
    password: attrs.password,
    first: attrs.first,
    last: attrs.last,
    token: attrs.token
  };
  console.log('Admin.Create attrs passed...', adminAttrs)
  return adminAttrs;

  // return db('users').insert(userAttrs).returning('id')
  //   .then(function(rows) {
  //     var newUser = {
  //       id: rows[0],
  //       email: userAttrs.email,
  //       password: userAttrs.password,
  //       first: userAttrs.first,
  //       last: userAttrs.last
  //     };
  //     return newUser;
  //   });
};





//hash
AdminSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};

AdminSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var Admin = db.model('Admin', AdminSchema);

module.exports = Admin;
