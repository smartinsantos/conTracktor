var db = require('mongoose');
var Schema = db.Schema;

var JobsSchema = new Schema({     
    propertie: {
      type: db.Schema.Types.ObjectId,
      ref: 'Properties'
    },
    unit: String,
    description: String,
    worker: {
      type: db.Schema.Types.ObjectId,
      ref: 'Workers'
    },
    date_assigned: Date,
    date_completed: Date,
    status: String,
    price: Number,
    poNumber: Number,
    invoiceNumber: Number,
    notes: String,
    quote: String // Link to the quote PDF
});


var Jobs = db.model('Jobs', JobsSchema);

module.exports = Jobs;
