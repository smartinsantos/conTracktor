var db = require('mongoose');
var Schema = db.Schema;

var CostSchema = new Schema({
    item: String,
    value: Number
});

var ServiceSchema = new Schema({
    item: String,
    description:String,
    worker: {
      type: String,
      ref: 'Worker',
    },
    date_assigned: Date,
    date_completed: Date,
    price:Number
});

var NotesSchema = new Schema({
    title:String,
    body:String
});

var JobsSchema = new Schema({ 
    manager: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true
    },      
    propertie: {
      type: String,
      ref: 'Propertie',
      required: true
    },
    unit: String,
    completed: Boolean,
    costs: [CostSchema],
    services:[ServiceSchema], 
    totalPrice: Number,
    totalCost:Number,
    poNumber: { type : String, unique: true },
    invoiceNumber: { type : String, unique: true },
    notes: [NotesSchema],
    quote: String // Link to the quote PDF
});


var Job = db.model('Job', JobsSchema);

module.exports = Job;
 
