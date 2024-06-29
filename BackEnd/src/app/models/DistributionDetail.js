const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');

const DistributionDetail = new Schema ({
        DistributionId: {type: String, required: true},
        MedicineId: {type: Number},
        Quantity: {type: Number},
    }
)

module.exports = mongoose.model('DistributionDetail', DistributionDetail); 
