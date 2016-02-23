var db = require('mongoose');
var Schema = db.Schema;

var CostSchema = new Schema({
    item: String,
    value: Number
});

var AttachmentsSchema = new Schema({
    item: String,
    url: String
})

var ServiceSchema = new Schema({
    item: String, // maybe another Schema [] to be able to search for this criteria
    description:String,
    worker: { type: Schema.Types.ObjectId, ref:'Worker'}, //Saves Worker ID 
    date_assigned: Date,
    price:Number
});

var JobsSchema = new Schema({ 
    manager: { type: Schema.Types.ObjectId, ref:'Admin', required:true}, // Saves Manager Name       
    propertie: { type: Schema.Types.ObjectId, ref: 'Propertie', required:true}, //Saves Property Name 
    unit: String,
    completed: Boolean,
    costs: [CostSchema],
    services:[ServiceSchema], 
    totalPrice: Number,
    totalCost:Number,
    poNumber: { type : String, unique: true, sparse:true },
    invoiceNumber: { type : String, unique: true, sparse:true },
    notes: String,
    date_completed: Date,
    attachments: [AttachmentsSchema]
});


var Job = db.model('Job', JobsSchema);

module.exports = Job;
 
