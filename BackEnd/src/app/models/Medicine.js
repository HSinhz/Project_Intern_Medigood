const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Medicine = new Schema ({
    MedicineId: {type: Number, required: true, unique: true},
    CategoryId: {type: Number, required: true},
    TypeId: {type: Number, required: true},
    MedicineName: {type: String, required: true},
    Price: {type: Number, required: true},
    Unit : {type: String},
    Quantity: {type: Number},
    ImgUrl : {type: String, required: true},
    Producer: {type: String, required: true},
    Ingredient: {type: String, required: true},
    Specification : {type: String, required: true},
    Description:  {type: String},
})

module.exports = mongoose.model('Medicine', Medicine); 
