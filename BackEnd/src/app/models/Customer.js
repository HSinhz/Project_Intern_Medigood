const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = new Schema ({
    CustomerPhone: {type: String},
    CustomerName: {type: String},
    Point: {type: Number, default: 0},
    ImgUrl: {type: String},
    Description:  {type: String},
})

module.exports = mongoose.model('Customer', Customer); 
