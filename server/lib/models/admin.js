var db = require('mongoose');
var Schema = db.Schema;

var AdminSchema = new Schema({
      first: String,
      last: String,
      email: {type: String, required: true, unique: true},
      password: String  
});



var Admin = db.model('Admin', AdminSchema);


module.exports = Admin;


