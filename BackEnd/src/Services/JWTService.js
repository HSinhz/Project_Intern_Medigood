const Personnel = require("../app/models/Personnel");
const {createJWT} = require("../middleware/jwtacction")
const getRefreshTokenUser = async ( payload ,emloyeeId) => {
    try {
        let existEmloyee = await Personnel.findOne({_id: emloyeeId});
        if(existEmloyee){
            if(existEmloyee.Refresh_token){
                let newAccessToken = createJWT(payload, 30*60); 
                await Personnel.updateOne({_id: emloyeeId}, {
                    Access_token: newAccessToken
                })
                return {
                    Success: true,
                    AT: newAccessToken,
                    Mess: 'Okkkk!!!!!'
                }
            }
            return {
                Success: false,
                Type: 401,
                Mess: 'Không có nhân viên'
            }
        }
        return {
            Success: false,
            Type: 401,
            Mess: 'Không có nhân viên'
        }
    } catch(error ){
        return {
            Success: false,
            Mess: 'Error from server'
        }
        console.log(error)
    }
} 

module.exports = {
    getRefreshTokenUser: getRefreshTokenUser
}