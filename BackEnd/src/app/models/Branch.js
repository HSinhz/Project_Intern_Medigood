const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Branch = new Schema (
    {
        Id: {type: String, required: true, unique: true},
        Name: {type: String, required: true},
        Description : {type: String},
    },{
        timestamps: true,
    }
)

module.exports = mongoose.model('Branch', Branch); 
