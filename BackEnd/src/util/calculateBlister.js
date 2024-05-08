
const calculateBlister = (Quantity, ViePerBlis) => {
    let blister = Quantity / ViePerBlis;
    return blister;
}


module.exports = {
    calculateBlister: calculateBlister
}