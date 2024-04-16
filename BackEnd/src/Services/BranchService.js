const Branch = require('../app/models/Branch');
const Personnel = require('../app/models/Personnel');
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

module.exports = {
    getBranch: getBranch
}