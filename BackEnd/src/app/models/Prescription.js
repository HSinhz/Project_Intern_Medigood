const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');

const Prescription = new Schema (
    {
        PrescriptionId: {type: String, required: true, unique: true },
        BranchId: {type: String},
        EmployeeId: {type: ObjectId},
        CustomerPhone: {type: String, default: ''},
        TotalDiscount: {type: Number, default: 0},
        Total: {type: Number},
        ObjectStatus: {type: Number, default: 3},
        Address: {type: String},
        Status: {type: Number, default: 1},
    }, {
        timestamps: true,
    },
)

module.exports = mongoose.model('Prescription', Prescription); 
