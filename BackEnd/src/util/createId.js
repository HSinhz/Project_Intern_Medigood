const createIdMedicine = () => {
    let min = 10000000;
    let max = 99999999;
    let MedicineId = Math.floor( Math.random() * ( max - min)) + min;
    return MedicineId;
}

module.exports = {
    createIdMedicine: createIdMedicine,
}