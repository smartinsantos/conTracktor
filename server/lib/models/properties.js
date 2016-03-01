var db = require('mongoose');
var Schema = db.Schema;

var ContactsSchema = new Schema({
    name: String, 
    phone:Number, 
    email:String
});

var PropertiesSchema = new Schema({
     name: {type: String, unique: true, required: true},
     contacts: [ContactsSchema],
     address: {
        street: String,
        street2: String,
        city: String,
        state: String,
        zip:Number,
      },
});


var Propertie = db.model('Propertie', PropertiesSchema);

module.exports = Propertie;
 
