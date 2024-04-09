const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupRole = new Schema ({
    PositionId: {type: Number},
    Url: {type: String},
    Description:  {type: String},
})

module.exports = mongoose.model('GroupRole', GroupRole); 
