const {INTERNAL_ERROR, OK} = require('../config/db/httpCode')
const Customer = require("../app/models/Customer");
const {checkExistPersonnel, checkExistCustomer} = require('../util/checkExist');

const getCustomer = async (Email , Phone) => {
    try{
        let existPersonnel = await checkExistPersonnel(Email);
        if(existPersonnel.Success === true) {
            let existCustomer = await Customer.findOne({CustomerPhone: Phone}).select("CustomerName CustomerPhone Point");
            if(existCustomer){
                return {
                    Success: true,
                    Mess: 'Dữ liệu khách hàng',
                    Type: OK,
                    Data: existCustomer
                }
            }
            return {
                Success: false,
                Mess: 'Khách hàng không tồn tại',
                Type: OK
            }
        }
        return existPersonnel;
    } catch (error){
        console.log("Error Service: ", error);
        return {
            Success: false,
            Mess: 'Vui lòng thử lại sau',
            Type: INTERNAL_ERROR
        }
    }
}

module.exports = {
    getCustomer: getCustomer
}