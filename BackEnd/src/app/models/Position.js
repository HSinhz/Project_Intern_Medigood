const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Position = new Schema ({
    Id: {type: Number},
    Name: {type: String},
    Description : {type: String},
})

module.exports = mongoose.model('Position', Position); 
