var db = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = Mongoose.Schema;

var WorkersSchema = new Schema({
      first: String,
      last: String,
      email: {type: String, required: true, unique: true},
      password: String,
      phone: String,
      address: String 
    }
});

//hash
WorkersSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};

WorkersSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var Workers = db.model('Workers', WorkersSchema);

module.exports = Workers;
