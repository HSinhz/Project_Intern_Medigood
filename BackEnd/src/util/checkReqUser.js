const {OK, NO_LOGGIN} = require("../config/db/httpCode")

module.exports.checkReqUser = (user) => {
    if(user){
        return {
            Success: true
        }
    }

    return {
        Success: false,
        Mess: 'Vui lòng đăng nhập',
        Type: NO_LOGGIN
    }
}
module.exports.checkReqParams = (params) => {
    if(params){
        return {
            Success: true
        }
    }

    return {
        Success: false,
        Mess: 'Không tồn tại',
        Type: OK
    }
}

module.exports.checkReqBody = (body) => {
    if(body){
        return {
            Success: true
        }
    }
    return {
        Success: false,
        Mess: 'Không tồn tại',
        Type: OK
    }
}
