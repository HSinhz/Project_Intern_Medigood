const crypto = require('crypto');


const createIdMedicine = () => {
    let min = 10000000;
    let max = 99999999;
    let MedicineId = Math.floor( Math.random() * ( max - min)) + min;
    return MedicineId;
}


const createIdPrescription = () => {
    let length = 12;
    return crypto.randomBytes(Math.ceil(length ))
        .toString('hex') // Chuyển buffer thành chuỗi hex
        .slice(0, length); // Cắt bớt độ dài nếu cần
}

module.exports = {
    createIdMedicine: createIdMedicine,
    createIdPrescription:createIdPrescription
}