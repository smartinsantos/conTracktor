var db = require('mongoose');
var Schema = db.Schema;

var AdminSchema = new Schema({
      first: String,
      last: String,
      email: {type: String, required: true, unique: true},
      password: String,
      phone: String,
      admin: Boolean, //if admin false means they are managers
      access_disable:Boolean, // if true access to the system is revoked
});



var Admin = db.model('Admin', AdminSchema);


module.exports = Admin;


