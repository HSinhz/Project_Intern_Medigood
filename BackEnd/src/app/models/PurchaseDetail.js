const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');

const PurchaseDetail = new Schema (
    {
        PurchaseId: {type: String, required: true},
        MedicineId: {type: Number},
        TotalPrice: {type: Number},
        Quantity: {type: Number},
        Unit: {type: Number},
    }
)

module.exports = mongoose.model('PurchaseDetail', PurchaseDetail); 
