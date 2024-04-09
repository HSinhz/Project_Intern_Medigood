const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Branch = new Schema (
    {
        Id: {type: Number},
        Name: {type: String},
        Description : {type: String},
    },{
        timestamps: true,
    }
)

module.exports = mongoose.model('Branch', Branch); 
