var db = require('mongoose');
var Schema = db.Schema;

var JobsSchema = new Schema({ 
    manager: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true
    },      
    propertie: {
      type: Schema.Types.ObjectId,
      ref: 'Propertie',
      required: true
    },
    unit: String,
    description: String,
    worker: {
      type: Schema.Types.ObjectId,
      ref: 'Worker',
    },
    date_assigned: Date,
    date_completed: Date,
    status: String,
    cost: Number, 
    price: Number,
    poNumber: { type : Number, unique: true },
    invoiceNumber: { type: Number, unique: true },
    notes: String, //Change to array of strings
    quote: String // Link to the quote PDF
});


var Job = db.model('Job', JobsSchema);

module.exports = Job;
