const Medicine = require('../app/models/Medicine');

const checkExistMedicine = async (MedicineId) => {
    try {
        let existMedicine = await Medicine.findOne({MedicineId: MedicineId});
        if(existMedicine) {
            return {
                Success: true,
                Data: existMedicine,
                Type: 200
            }
        }
        return {
            Success: false,
            Mess: 'Không có sản phẩm',
            Type: 201
        }
    } catch(error){
        console.log("Error Service: ", error);
        return {
            Success: false,
            Mess: 'Vui lòng thử lại',
            Type: 500
        }
    }
}

module.exports = {
    checkExistMedicine: checkExistMedicine
}