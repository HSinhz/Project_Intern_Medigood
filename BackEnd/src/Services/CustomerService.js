const {INTERNAL_ERROR, OK} = require('../config/db/httpCode')
const Customer = require("../app/models/Customer");
const {checkExistPersonnel, checkExistCustomer, checkExistBranch} = require('../util/checkExist');

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

const createCustomer = async (Email, BranchId, DataCustomer) => {
    try {
        console.log("DataCustomer: ", DataCustomer)
        let existPersonnel = await checkExistPersonnel(Email);
        if(existPersonnel.Success === true) {
            let existBranch = await checkExistBranch(BranchId);
            if(existBranch.Success === true) {
                let existCustomer = await checkExistCustomer(DataCustomer.CustomerPhone);
                if(existCustomer.Success === true){
                    return {
                        Success: false,
                        Mess: 'Khách hàng đã tồn tại',
                        Type: OK,
                    }
                } else {
                    const newCustomer = new Customer({
                        CustomerPhone: DataCustomer.CustomerPhone,
                        CustomerName: DataCustomer.CustomerName
                    })
                    let saveCustomer = await newCustomer.save();
                    if(saveCustomer.CustomerPhone){
                        return {
                            Success: true,
                            Mess: "Thêm khách hàng mới thành công",
                            Type: OK
                        }
                    }
                    return {
                        Success: false,
                        Mess: "Thêm khách hàng mới thất bại. Vui lòng thử lại sau",
                        Type: OK
                    }
                }
            }
            return existBranch;
        } 
        return existPersonnel
    } catch (error) {
        console.log("Error Service: ", error);
        return {
            Success: false,
            Mess: 'Vui lòng thử lại sau',
            Type: INTERNAL_ERROR
        }
    }
}

module.exports = {
    getCustomer: getCustomer,
    createCustomer: createCustomer
}