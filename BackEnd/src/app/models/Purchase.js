const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');

const Purchase = new Schema (
    {
        PurchaseId: {type: String, required: true, unique: true },
        EmployeeEmail: {type: String, required: true},
        SupplierId: {type: String, required: true},
        TotalQuantity: {type: Number, required: true},
        TotalDiscount: {type: Number, default: 0},
        Total: {type: Number},
        ObjectStatus: {type: Number, default: 5},
        Status: {type: Number, default: 1},
    }, {
        timestamps: true,
    },
)

module.exports = mongoose.model('Purchase', Purchase); 
