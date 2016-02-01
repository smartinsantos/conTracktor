var db = require('mongoose');
var Schema = Mongoose.Schema;

var JobsSchema = new Schema({
     
    propertie: String, // Foreing Key Checkout
    propertie: {
      type: db.Schema.Types.ObjectId,
      ref: 'Properties',
      }
    unit: String,
    description: String,
    worker: {
      type: db.Schema.Types.ObjectId,
      ref: 'Workers',
      }
    date_assigned: Date,
    date_completed: Date,
    status: String,
    price: Number,
    poNumber: Number,
    invoiceNumber: Number,
    notes: String,
    quote: String // Link to the quote PDF
  }
});


var Jobs = db.model('Jobs', JobsSchema);

module.exports = Jobs;
