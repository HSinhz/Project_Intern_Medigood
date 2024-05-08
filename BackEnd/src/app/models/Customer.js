const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = new Schema ({
    CustomerId: {type: Number},
    Phone: {type: String},
    CustomerName: {type: String},
    Gender: { type: String, required: true},
    Point: {type: Number},
    ImgUrl: {type: String},
    Description:  {type: String},
})

module.exports = mongoose.model('Customer', Customer); 
