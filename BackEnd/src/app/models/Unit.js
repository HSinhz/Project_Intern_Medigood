const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Unit = new Schema (
    {
        Id: {type: String, required: true, unique: true},
        UnitName: {type: String, required: true},
    }
)

module.exports = mongoose.model('Unit', Unit); 
