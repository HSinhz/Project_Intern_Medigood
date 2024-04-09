const { v4: uuidv4 } = require('uuid');

const createOTPCode = () => {
    let min = 100000;
    let max = 999999;
    let OTP = Math.floor( Math.random() * ( max - min)) + min;
    return OTP;
}

const generateOTP = () => {
    const url = uuidv4();
    const ExpVerify = Date.now() + 5 * 60 * 1000;
    const OTP = createOTPCode();
    return { OTP, ExpVerify, url };
}
module.exports = {
    generateOTP: generateOTP,
}