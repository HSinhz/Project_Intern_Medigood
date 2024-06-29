const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupStatus = new Schema ({
    ObjectStatus: {type: Number},
    StatusId: {type: Number},
    StatusName: {type: String}
})

module.exports = mongoose.model('GroupStatus', GroupStatus); 
