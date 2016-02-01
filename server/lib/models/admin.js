var db = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = Mongoose.Schema;

var AdminSchema = new Schema({
      first: String,
      last: String,
      email: {type: String, required: true, unique: true},
      password: String,
    }
});

//hash
AdminSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};

AdminSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var Admin = db.model('Admin', AdminSchema);

module.exports = Admin;
