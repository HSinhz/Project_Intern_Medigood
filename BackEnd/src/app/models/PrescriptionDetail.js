const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');

const PrescriptionDetail = new Schema (
    {
        PrescriptionId: {type: String, required: true},
        MedicineId: {type: Number},
        MedicineName: {type: String},
        TotalPrice: {type: Number},
        Quantity: {type: Number},
        Unit: {type: Number},
    }
)

module.exports = mongoose.model('PrescriptionDetail', PrescriptionDetail); 
