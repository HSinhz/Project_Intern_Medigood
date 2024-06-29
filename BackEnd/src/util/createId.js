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

const createIdSupplier = (SupplierName) => {
    let inputString = SupplierName;
    let words = inputString.split(' ');
    let initials = words.map(word => word.charAt(0));
    let result = initials.join('');
    if(result.length < 8){
        let charsToAdd = 8 - result.length;
        let randomNumberString = Math.random().toString().slice(2);
        let randomChars = randomNumberString.padEnd(charsToAdd, '0').slice(0, charsToAdd);
        result += randomChars;
    }
    return result;
}

const createIdPurchase = () => {
    let lengthWord = 3;
    let characters = 'QWERTYUIOPLKJHGFDSSAMNBVCXZ';
    let threeWord = Array.from({ lengthWord }, () => characters.charAt(Math.floor(Math.random() * characters.lengthWord))).join('');
    let randomNumber = Math.floor( Math.random() * ( 99999 - 10000)) + 10000;
    threeWord += randomNumber;
    return threeWord;


}
module.exports = {
    createIdMedicine: createIdMedicine,
    createIdPrescription:createIdPrescription,
    createIdSupplier:createIdSupplier,
    createIdPurchase:createIdPurchase
}