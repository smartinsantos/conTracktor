var db = require('mongoose');
var Schema = db.Schema;

var ReportsSchema = new Schema({ 
    owner:{ type: Schema.Types.ObjectId, ref:'Admin', required:true},
    date: {
        start: Date,
        end: Date
    },
    jobs: [],
    reportType:String,
    worker: String,
    manager: String,
    propertie: String,
    name: {type:String, unique:true}
});


var Report = db.model('Report', ReportsSchema);

module.exports = Report;
 
