var db = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = db.Schema;

var WorkersSchema = new Schema({
      first: String,
      last: String,
      email: {type: String, required: true, unique: true},
      password: String,
      phone: String,
      address: String 
});

var Workers = db.model('Workers', WorkersSchema);

module.exports = Workers;
