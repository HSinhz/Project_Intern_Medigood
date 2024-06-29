const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Supplier = new Schema (
    {
        SupplierId: {type: String, required: true, unique: true},
        SupplierEmail: {type: String, required: true},
        SupplierPhone: {type: String, required: true},
        SupplierName: {type: String, required: true},
        SupplierAddress: {type: String, required: true},
        SupplierAddress2: {type: String, default: ''},
        Description : {type: String},
        ObjectStatus: {type: Number, default: 7},
        Status: {type: Number, default: 1},
    },{
        timestamps: true,
    }
)

module.exports = mongoose.model('Supplier', Supplier); 
