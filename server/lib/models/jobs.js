var db = require('mongoose');
var Schema = db.Schema;

var JobsSchema = new Schema({     
    propertie: {
      type: Schema.Types.ObjectId,
      ref: 'Propertie'
    },
    unit: String,
    description: String,
    worker: {
      type: Schema.Types.ObjectId,
      ref: 'Worker'
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


var Job = db.model('Job', JobsSchema);

module.exports = Job;
