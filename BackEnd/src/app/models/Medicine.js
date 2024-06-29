const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Medicine = new Schema ({
    MedicineId: {type: Number, required: true, unique: true},
    CategoryId: {type: Number, required: true},
    TypeId: {type: Number, required: true},
    MedicineName: {type: String, required: true},
    MedicineDetailName: {type: String, required: true},
    Price: {type: Number, required: true},
    Unit : {type: Number},
    ViePerBox: {type: Number},
    ViePerBlis: {type: Number, default: null},
    ImgUrl : {type: String, required: true},
    Producer: {type: String, required: true},
    Ingredient: {type: String, required: true},
    Specification : {type: String, required: true},
    Inventory: {type: Number, default: 0},
    Stock: {type: Number, default: 0},
    ObjectStatus: {type: Number, default: 2},
    Status: {type: Number, default: 1},
    Description:  {type: String},
})

module.exports = mongoose.model('Medicine', Medicine); 
