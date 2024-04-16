const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema ({
    TypeId: {type: Number, required: true},
    CategoryId: {type: Number, required: true, unique: true},
    CategoryName: {type: String, required: true},
    Description:  {type: String},
})

module.exports = mongoose.model('Category', Category); 
