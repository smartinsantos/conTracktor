var db = require('mongoose');
var Schema = db.Schema;

var WorkersSchema = new Schema({
      first: String,
      last: String,
      email: {type: String, required: true, unique: true},
      password: String,
      phone: String,
      address: String 
});

var Worker = db.model('Worker', WorkersSchema);

module.exports = Worker;
