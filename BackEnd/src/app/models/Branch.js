const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Branch = new Schema (
    {
        Id: {type: String, required: true, unique: true},
        Address: {type: String, required: true},
        ObjectStatus: {type: Number, default: 4},
        Status: {type: Number, default: 1},
        Description : {type: String},
    },{
        timestamps: true,
    }
)

module.exports = mongoose.model('Branch', Branch); 
