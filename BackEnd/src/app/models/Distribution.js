const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Distribute = new Schema (
    {
        DistributeId: {type: String, required: true, unique: true },
        BranchId: {type: String, required: true},
        EmployeeEmail: {type: String, required: true},
        TotalQuantity: {type: Number, required: true},
        Status: {type: Number, default: 1},
        ObjectStatus: {type: Number, default: 6},
    }, {
        timestamps: true,
    },
)

module.exports = mongoose.model('Distribute', Distribute); 
