const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Type = new Schema ({
    TypeId: {type: Number, required: true , unique: true},
    TypeName: {type: String, required: true},
    Description:  {type: String},
})

module.exports = mongoose.model('Type', Type); 
