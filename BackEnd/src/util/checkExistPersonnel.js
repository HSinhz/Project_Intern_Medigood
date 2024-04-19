const Personnel = require('../app/models/Personnel');

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

module.exports = {
    checkExistPersonnel: checkExistPersonnel
}