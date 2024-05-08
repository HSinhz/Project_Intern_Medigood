const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicineBranch = new Schema (
    {
        BranchId: {type: String, required: true},
        MedicineId: {type: Number, required: true},
        Quantity: {type: Number, default: 0}

    },{
        timestamps: true,
    }
)

module.exports = mongoose.model('MedicineBranch', MedicineBranch); 
