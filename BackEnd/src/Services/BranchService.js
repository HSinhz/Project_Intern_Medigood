const Branch = require('../app/models/Branch');
const Personnel = require('../app/models/Personnel');
const {checkExistPersonnel, checkExistBranch} = require('../util/checkExist');
const {OK, INTERNAL_ERROR} = require("../config/db/httpCode");

const getBranch = async (Email) => {
    try{
        let existUser = await Personnel.findOne({Email: Email});
        if(existUser){
            let allPosition = await Branch.find();
            return {
                Success: true,
                Type: 200,
                Mess: 'All Position',
                Data: allPosition
            }
        }
        return {
            Success: false,
            Type: 401,
            Mess: 'Không tồn tại nhân viên',
            Data: '',
        }
    } catch (error){
        console.log(error);
        return {
            Success: false,
            Type: 500,
            Mess: 'Error from server',
            Data: ''
        }
    }
}

const getBranchWithId = async (Email, BranchId) => {
    try {
        let existEmployee = await checkExistPersonnel(Email);
        if(existEmployee.Success === true){
            console.log("BranchId: ", BranchId);
            let existBranch = await checkExistBranch(BranchId);
            if( existBranch.Success === true ){
                let dataBranch = await Branch.findOne({Id: BranchId});
                console.log("dataBranch: ", dataBranch);
                return {
                    Success: true,
                    Data: dataBranch,
                    Type: OK,
                }
            } 
            return existBranch;
        }
        return existEmployee;
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
    getBranch: getBranch,
    getBranchWithId: getBranchWithId
}