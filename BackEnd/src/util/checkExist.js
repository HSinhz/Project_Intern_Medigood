const Branch = require('../app/models/Branch');
const Medicine = require('../app/models/Medicine');
const Personnel = require('../app/models/Personnel');
const Customer = require("../app/models/Customer");
const {INTERNAL_ERROR, NO_LOGGIN, OK} = require('../config/db/httpCode')

const checkExistBranch = async (BranchId) => {
    try {
        let existBranch = await Branch.findOne({Id: BranchId});
        if(existBranch ){
            return {
                Success: true
            }
        }
        return {
            Success: false,
            Mess: "Chi nhánh không tồn tại",
            Type: 200
        }
    } catch(error){
        console.log("Error Service: ", error);
        return {
            Success: false,
            Mess: 'Vui lòng thử lại 1111',
            Type: 500
        }
    }
}

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

const checkExistPersonnel = async (Email) => {
    try {
        let existPersonnel = await Personnel.findOne({Email: Email});
        if(existPersonnel){
            return {
                Success: true,
                Data: existPersonnel
            }
        }
        return {
            Success: false,
            Mess: 'Vui lòng đăng nhập',
            Type: 401
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

const checkExistCustomer = async (Phone) => {
    try {
        let existCustomer = await Customer.findOne({CustomerPhone: Phone});
        if(existCustomer) {
            return {
                Success: true,
                Mess: "OKKK",
                Type: OK
            }
        }
        return {
            Success: false,
            Mess: "Khách hàng không tồn tại",
            Type: OK
        }
    } catch(error){
        console.log("Error Service: ", error);
        return {
            Success: false,
            Mess: 'Vui lòng thử lại',
            Type: INTERNAL_ERROR
        }
    }
}

module.exports = {
    checkExistBranch: checkExistBranch,
    checkExistMedicine: checkExistMedicine,
    checkExistPersonnel: checkExistPersonnel,
    checkExistCustomer: checkExistCustomer

}