const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');

const Prescription = new Schema (
    {
        PrescriptionId: {type: String, required: true, unique: true },
        BranchId: {type: String, required: true},
        EmployeeId: {type: ObjectId, required: true},
        CustomerPhone: {type: String, default: ''},
        Total: {type: Number},
    }, {
        timestamps: true,
    },
)

module.exports = mongoose.model('Prescription', Prescription); 
