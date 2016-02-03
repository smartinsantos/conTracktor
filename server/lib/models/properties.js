var db = require('mongoose');
var Schema = db.Schema;

var PropertiesSchema = new Schema({
     name: {type: String, unique: true, required: true},
     address: String,
     contacts: Array,
     description: String    
});


var Propertie = db.model('Propertie', PropertiesSchema);

module.exports = Propertie;
