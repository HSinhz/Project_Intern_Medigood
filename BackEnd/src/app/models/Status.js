const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Status = new Schema ({
    ObjectStatus: {type: Number},
    ObjectName: {type: String}
})

module.exports = mongoose.model('Status', Status); 
