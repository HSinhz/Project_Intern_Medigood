require("dotenv").config();
const Employee = require('../app/models/Employee');
const { createJWT} = require('../middleware/jwtacction');
const bcryptjs = require('bcryptjs');
const GroupRole = require('../app/models/GroupRole');
const handlerLogin = async ( userData) => {
    try{
        let data = {};
        let existUser = await Employee.findOne({ Email: userData.Email})
            if( existUser ){
                let checkpass =  checkPassWord( userData.Password, existUser.Password);
                if( checkpass ){
                    if( existUser.Verify === true){
                        let roleUser = await GroupRole.find({PositionId: existUser.PositionId}).select("Url");
                        const groupRoleUrl = roleUser.map(role => role.Url);
                        let payload = {
                            shopId: existUser._id,
                            email: existUser.Email,
                            Roles: groupRoleUrl,                            
                        }
                        // tạo Access_Token và Refresh_Token
                        let accessToken = createJWT(payload, 30*60);
                        let refreshToken = createJWT(payload, null);
                        Employee.updateOne( {Email:existUser.Email},{
                            $set: {
                                Online: true,
                                Access_token: accessToken,
                                Refresh_token: refreshToken
                            }
                        }).catch( err => { console.error(err); })
                        return {
                            Success :true,
                            Mess : 'Đăng nhập thành công',
                            access_token:  accessToken,
                        }        
                    } 
                    return {
                        data : {
                            Success :false,
                            Mess : 'Account is invalid', 
                        }   
                    }
                }   
                return {
                    data : {
                        Success :false,
                        Mess : 'Email hoặc mật khẩu sai', 
                    }    
                }
            } 
            return {    
                data : {
                    Success :false,
                    Mess : 'Email hoặc mật khẩu sai',
                }    
            }
    } catch (error) {
        console.log(error);
        return {
            Success: false,
            Mess: 'ERROR: from Server'
        }
    }
}

const checkPassWord = (inputPass, hashPass) => {
    return bcryptjs.compareSync( inputPass, hashPass);
}

const getPosition = async () => {
    console.log("iiii")
    let data = await GroupRole.find();
    return data;
}
module.exports = {
    handlerLogin: handlerLogin,
    getPosition: getPosition

}