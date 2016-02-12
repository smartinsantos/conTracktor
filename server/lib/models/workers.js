var db = require('mongoose');
var Schema = db.Schema;

var WorkersSchema = new Schema({
      first: String,
      last: String,
      email: {type: String, required: true, unique: true},
      phone: String,
      address: {
        street: String,
        street2: String,
        city: String,
        state: String,
        zip:Number,
      } 
});

var Worker = db.model('Worker', WorkersSchema);

module.exports = Worker;
